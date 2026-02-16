import CourseHeader from "./CourseHeader";
import CourseContent from "./CourseContent";
import CourseTotal from "./CourseTotal";

const Course = ({ course }) => {
  const { name, parts } = course;

  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <CourseHeader title={name} />
      <CourseContent parts={parts} />
      <CourseTotal num={total} />
    </>
  );
};

export default Course;
