const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding CampusBridge SQLite database...');

  // Clean existing records
  await prisma.parentStudent.deleteMany();
  await prisma.teacherClass.deleteMany();
  await prisma.user.deleteMany();
  await prisma.class.deleteMany();
  await prisma.school.deleteMany();

  // 1. Create School
  const school = await prisma.school.create({
    data: {
      name: 'Greenwood High School',
      code: 'GHS01',
      address: '100 Campus Way, Tech City'
    }
  });
  console.log(`✅ Created School: ${school.name} (Code: ${school.code})`);

  // Hash common password
  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 2. Create Users (Admin, Teacher, Parent, Student)
  const admin = await prisma.user.create({
    data: {
      schoolId: school.id,
      name: 'Rajesh Shah (Admin)',
      email: 'admin@campusbridge.edu',
      passwordHash,
      role: 'ADMIN',
      phone: '+1-555-0101'
    }
  });

  const teacher = await prisma.user.create({
    data: {
      schoolId: school.id,
      name: 'Priya Patel (Teacher)',
      email: 'teacher@campusbridge.edu',
      passwordHash,
      role: 'TEACHER',
      phone: '+1-555-0102'
    }
  });

  const parent = await prisma.user.create({
    data: {
      schoolId: school.id,
      name: 'Vikram Mehta (Parent)',
      email: 'parent@campusbridge.edu',
      passwordHash,
      role: 'PARENT',
      phone: '+1-555-0103'
    }
  });

  const student = await prisma.user.create({
    data: {
      schoolId: school.id,
      name: 'Aarav Mehta (Student)',
      email: 'student@campusbridge.edu',
      passwordHash,
      role: 'STUDENT',
      phone: '+1-555-0104'
    }
  });

  console.log(`✅ Created Users: Admin (${admin.email}), Teacher (${teacher.email}), Parent (${parent.email}), Student (${student.email})`);

  // 3. Create Class
  const classA = await prisma.class.create({
    data: {
      schoolId: school.id,
      name: 'Grade 10',
      section: 'A',
      academicYear: '2026-2027'
    }
  });
  console.log(`✅ Created Class: ${classA.name}-${classA.section}`);

  // 4. Assign Teacher to Class
  await prisma.teacherClass.create({
    data: {
      teacherId: teacher.id,
      classId: classA.id,
      subject: 'Mathematics',
      academicYear: '2026-2027'
    }
  });
  console.log(`✅ Assigned Teacher ${teacher.name} to ${classA.name}-${classA.section} (Subject: Mathematics)`);

  // 5. Link Parent and Student
  await prisma.parentStudent.create({
    data: {
      parentId: parent.id,
      studentId: student.id,
      relationship: 'FATHER'
    }
  });
  console.log(`✅ Linked Parent ${parent.name} to Student ${student.name}`);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
