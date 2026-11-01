export const INITIAL_ENROLLMENTS = [
  {
    enrollmentId: "ENR-2026-0091",
    studentId: "STU-2026-8841",
    studentName: "Aarav Sharma",
    courseId: "CSE-401",
    courseTitle: "Full Stack Web Development",
    enrollmentDate: "2026-10-15",
    status: "Confirmed",
    paymentStatus: "Successful",
    amount: 24500,
    lastUpdated: "2026-10-15T10:35:00.000Z"
  },
  {
    enrollmentId: "ENR-2026-0104",
    studentId: "STU-2026-8841",
    studentName: "Aarav Sharma",
    courseId: "AIM-502",
    courseTitle: "Artificial Intelligence and Machine Learning",
    enrollmentDate: "2026-10-22",
    status: "Pending Payment",
    paymentStatus: "Pending",
    amount: 32000,
    lastUpdated: "2026-10-22T14:20:00.000Z"
  },
  {
    enrollmentId: "ENR-2026-0078",
    studentId: "STU-2026-8841",
    studentName: "Aarav Sharma",
    courseId: "CLD-303",
    courseTitle: "Cloud Computing with AWS",
    enrollmentDate: "2026-10-05",
    status: "Confirmed",
    paymentStatus: "Successful",
    amount: 26000,
    lastUpdated: "2026-10-05T09:12:00.000Z"
  },
  {
    enrollmentId: "ENR-2026-0042",
    studentId: "STU-2026-8842",
    studentName: "Sneha Patel",
    courseId: "CSE-401",
    courseTitle: "Full Stack Web Development",
    enrollmentDate: "2026-10-12",
    status: "Confirmed",
    paymentStatus: "Successful",
    amount: 24500,
    lastUpdated: "2026-10-12T11:00:00.000Z"
  },
  {
    enrollmentId: "ENR-2026-0055",
    studentId: "STU-2026-8843",
    studentName: "Karan Mehta",
    courseId: "AIM-502",
    courseTitle: "Artificial Intelligence and Machine Learning",
    enrollmentDate: "2026-10-18",
    status: "Confirmed",
    paymentStatus: "Successful",
    amount: 32000,
    lastUpdated: "2026-10-18T16:45:00.000Z"
  }
];

// Generate filled enrollments for CYB-204 (capacity 35 -> 35 enrollments) and AIM-502 (capacity 50 -> 48 enrollments)
// to demonstrate "Full course" and "Nearly full course" rules dynamically
export const generateBaseEnrollments = () => {
  const list = [...INITIAL_ENROLLMENTS];
  
  // Fill CYB-204 to capacity 35
  for (let i = 1; i <= 35; i++) {
    list.push({
      enrollmentId: `ENR-CYB-${String(i).padStart(3, "0")}`,
      studentId: `STU-DEMO-${1000 + i}`,
      studentName: `Batch Student ${i}`,
      courseId: "CYB-204",
      courseTitle: "Cybersecurity Fundamentals",
      enrollmentDate: "2026-10-01",
      status: "Confirmed",
      paymentStatus: "Successful",
      amount: 28500,
      lastUpdated: "2026-10-01T12:00:00.000Z"
    });
  }

  // Fill AIM-502 to 48 enrollments (2 seats remain out of 50)
  // note STU-2026-8841 and STU-2026-8843 are already 2 enrollments in list
  for (let i = 3; i <= 48; i++) {
    list.push({
      enrollmentId: `ENR-AIM-${String(i).padStart(3, "0")}`,
      studentId: `STU-AIM-${2000 + i}`,
      studentName: `AI Scholar ${i}`,
      courseId: "AIM-502",
      courseTitle: "Artificial Intelligence and Machine Learning",
      enrollmentDate: "2026-10-04",
      status: "Confirmed",
      paymentStatus: "Successful",
      amount: 32000,
      lastUpdated: "2026-10-04T12:00:00.000Z"
    });
  }

  // Fill CSE-401 to 24 enrollments
  for (let i = 3; i <= 24; i++) {
    list.push({
      enrollmentId: `ENR-CSE-${String(i).padStart(3, "0")}`,
      studentId: `STU-CSE-${3000 + i}`,
      studentName: `CS Cohort ${i}`,
      courseId: "CSE-401",
      courseTitle: "Full Stack Web Development",
      enrollmentDate: "2026-10-08",
      status: "Confirmed",
      paymentStatus: "Successful",
      amount: 24500,
      lastUpdated: "2026-10-08T12:00:00.000Z"
    });
  }

  return list;
};

export const INITIAL_PAYMENTS = [
  {
    paymentId: "PAY-2026-5510",
    enrollmentId: "ENR-2026-0091",
    studentId: "STU-2026-8841",
    studentName: "Aarav Sharma",
    courseId: "CSE-401",
    courseTitle: "Full Stack Web Development",
    amount: 24500,
    paymentMethod: "UPI Demo",
    paymentStatus: "Successful",
    transactionReference: "TXN-AX-99482710",
    paymentDate: "2026-10-15T10:35:00.000Z",
    notes: "Tuition installment complete via institutional UPI gateway.",
    dtiBreakdown: {
      baseTuition: 19500,
      techLabSurcharge: 2500,
      digitalLibraryFee: 1200,
      examLevy: 1300,
      taxGST: 0,
      total: 24500
    }
  },
  {
    paymentId: "PAY-2026-5489",
    enrollmentId: "ENR-2026-0078",
    studentId: "STU-2026-8841",
    studentName: "Aarav Sharma",
    courseId: "CLD-303",
    courseTitle: "Cloud Computing with AWS",
    amount: 26000,
    paymentMethod: "Card Demo",
    paymentStatus: "Successful",
    transactionReference: "TXN-AX-88291044",
    paymentDate: "2026-10-05T09:15:00.000Z",
    notes: "Tuition fee processed via Academic Debit Card simulation.",
    dtiBreakdown: {
      baseTuition: 20500,
      techLabSurcharge: 3000,
      digitalLibraryFee: 1100,
      examLevy: 1400,
      taxGST: 0,
      total: 26000
    }
  },
  {
    paymentId: "PAY-2026-5390",
    enrollmentId: "ENR-2026-0104",
    studentId: "STU-2026-8841",
    studentName: "Aarav Sharma",
    courseId: "AIM-502",
    courseTitle: "Artificial Intelligence and Machine Learning",
    amount: 32000,
    paymentMethod: "Net Banking Demo",
    paymentStatus: "Failed",
    transactionReference: "TXN-AX-FAIL-10492",
    paymentDate: "2026-10-22T14:22:00.000Z",
    notes: "Simulation test: User session timed out or simulated bank decline.",
    dtiBreakdown: {
      baseTuition: 25000,
      techLabSurcharge: 3800,
      digitalLibraryFee: 1600,
      examLevy: 1600,
      taxGST: 0,
      total: 32000
    }
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-001",
    userId: "STU-2026-8841",
    title: "Tuition Payment Confirmed",
    message: "Your payment of ₹24,500 for Full Stack Web Development (CSE-401) was successfully processed. Receipt TXN-AX-99482710 is available.",
    type: "payment",
    read: false,
    date: "2026-10-15T10:35:00.000Z",
    link: "/student/receipt/PAY-2026-5510"
  },
  {
    id: "NOTIF-002",
    userId: "STU-2026-8841",
    title: "Pending Tuition Notice",
    message: "Your enrollment in AIM-502 (Artificial Intelligence and Machine Learning) is currently pending tuition payment. Complete payment before Nov 15.",
    type: "enrollment",
    read: false,
    date: "2026-10-22T14:25:00.000Z",
    link: "/student/payments"
  },
  {
    id: "NOTIF-003",
    userId: "ALL",
    title: "Tuition Fee Schedule Module Online",
    message: "The institutional fee schedule module is active. Students can now inspect itemized lab surcharges and exam levies before enrollment.",
    type: "system",
    read: true,
    date: "2026-10-01T08:00:00.000Z",
    link: "/courses"
  },
  {
    id: "NOTIF-004",
    userId: "INS-2026-104",
    title: "Course Capacity Alert",
    message: "Your course 'Artificial Intelligence and Machine Learning' has reached 48/50 capacity (96% booked). Only 2 seats remain.",
    type: "capacity",
    read: false,
    date: "2026-10-24T11:15:00.000Z",
    link: "/instructor/courses"
  },
  {
    id: "NOTIF-005",
    userId: "ADM-2026-001",
    title: "Tuition Fee Reconciliation Report",
    message: "Quarterly institutional tuition audit is generated. Total collections have crossed ₹1,20,000 across active cohorts.",
    type: "admin",
    read: false,
    date: "2026-10-25T09:00:00.000Z",
    link: "/admin/reports"
  }
];
