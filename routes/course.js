import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middlewares
import { requireSignin, isInstructor, isEnrolled} from "../middlewares";
// controller
const {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
  removeVideo,
  addLesson,
  update,
  removeLesson,
  updateLesson,
  publishCourse,
  unpublishCourse,
  courses,
  checkEnrollment,
  freeEnrollment,
  userCourses
} = require("../controllers/course");

// image
router.post("/course/upload-image", requireSignin, uploadImage);
router.post("/course/remove-image", requireSignin, removeImage);
// video
router.post(
  "/course/upload-video/:courseId",
  requireSignin,
  formidable({ maxFileSize: 500 * 1024 * 1024 }),
  uploadVideo, 
);

router.get('/courses', courses)

router.post("/course/remove-video/:courseId", requireSignin, removeVideo);
// course
router.post("/course", requireSignin, isInstructor, create);
router.get("/course/:slug", read);
// update course
router.put("/course/:slug", requireSignin, update);

router.put("/course/publish/:courseId", requireSignin, publishCourse);

router.put("/course/unpublish/:courseId", requireSignin, unpublishCourse);
// lessons
router.post("/course/addlesson/:slug/:instructorId", requireSignin, addLesson);
// delete
router.put("/course/:slug/:lessonId", requireSignin, removeLesson);
// update
router.post("/course/lesson/:courseId/:lessonId", requireSignin, updateLesson);
// publish course

router.get("/check-enrollment/:courseId", requireSignin, checkEnrollment);

router.post("/free-enrollment/:courseId", requireSignin, freeEnrollment);

router.get("/user-courses", requireSignin, userCourses);

router.get("/user/course/:slug", requireSignin, isEnrolled, read);

module.exports = router;
