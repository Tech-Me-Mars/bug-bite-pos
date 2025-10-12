export default function getRouteActive(to, from, next) {
const currentPath = to.fullPath;
localStorage.setItem("menuActive", currentPath);

  // ทำงานอื่นๆ ใน middleware ตามต้องการ

  next(); // หลังจากที่เสร็จสิ้นใน middleware
  }
