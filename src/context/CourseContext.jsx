import React, { createContext, useContext, useState, useEffect } from "react";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "../utils/storage";
import { INITIAL_COURSES } from "../data/initialCourses";
import { validateCourseData } from "../utils/validation";
import { calculateDTI } from "../utils/formatters";
import { apiService } from "../services/api";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    return getStorageItem(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  });

  // Fetch courses from MySQL on mount
  useEffect(() => {
    apiService.courses
      .getAll()
      .then((remoteCourses) => {
        if (Array.isArray(remoteCourses) && remoteCourses.length > 0) {
          setCourses(remoteCourses);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.COURSES, courses);
  }, [courses]);

  const getCourseById = (id) => {
    if (!id) return null;
    return courses.find((c) => c.id.toLowerCase() === id.toLowerCase()) || null;
  };

  const addCourse = (courseData) => {
    const validation = validateCourseData(courseData, 0);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const id = courseData.id?.trim() || `CRS-${Date.now().toString().slice(-4)}`;
    const fee = Number(courseData.tuitionFee) || 0;
    const capacity = Number(courseData.capacity) || 30;

    const newCourse = {
      ...courseData,
      id,
      tuitionFee: fee,
      capacity,
      status: courseData.status || "Active",
      level: courseData.level || "Intermediate",
      credits: Number(courseData.credits) || 3,
      image:
        courseData.image?.trim() ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      dti: calculateDTI(fee, courseData.dti)
    };

    setCourses((prev) => [newCourse, ...prev]);

    // Persist to MySQL Course Microservice
    apiService.courses.create(newCourse).catch((err) => {
      console.warn("[CourseContext] MySQL create sync error:", err);
    });

    return { success: true, course: newCourse };
  };

  const updateCourse = (id, updatedFields, activeEnrollmentsCount = 0) => {
    const existing = courses.find((c) => c.id === id);
    if (!existing) {
      return { success: false, message: "Course not found." };
    }

    const merged = { ...existing, ...updatedFields };
    const validation = validateCourseData(merged, activeEnrollmentsCount);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const fee = Number(merged.tuitionFee) || 0;
    const capacity = Number(merged.capacity) || existing.capacity;

    const finalized = {
      ...merged,
      tuitionFee: fee,
      capacity,
      dti: calculateDTI(fee, merged.dti)
    };

    setCourses((prev) => prev.map((c) => (c.id === id ? finalized : c)));

    // Persist to MySQL Course Microservice
    apiService.courses.update(id, finalized).catch((err) => {
      console.warn("[CourseContext] MySQL update sync error:", err);
    });

    return { success: true, course: finalized };
  };

  const toggleCourseStatus = (id) => {
    let nextStatus = "Active";
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          nextStatus = c.status === "Active" ? "Inactive" : "Active";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );

    // Persist to MySQL Course Microservice
    apiService.courses.update(id, { status: nextStatus }).catch((err) => {
      console.warn("[CourseContext] MySQL toggle sync error:", err);
    });

    return { success: true };
  };

  const deleteCourse = (id, activeEnrollmentsCount = 0) => {
    if (activeEnrollmentsCount > 0) {
      return {
        success: false,
        message: `Cannot delete course with ${activeEnrollmentsCount} active student enrollments. Consider deactivating instead.`
      };
    }

    setCourses((prev) => prev.filter((c) => c.id !== id));

    // Persist to MySQL Course Microservice
    apiService.courses.delete(id).catch((err) => {
      console.warn("[CourseContext] MySQL delete sync error:", err);
    });

    return { success: true };
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        getCourseById,
        addCourse,
        updateCourse,
        toggleCourseStatus,
        deleteCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
