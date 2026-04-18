import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTeacher from "../../components/modal/AddTeacher";
import { deleteTeacher, getAllUsers } from "../../store/slices/adminSlice";

const ManageTeachers = () => {
   const { users } = useSelector((state) => state.admin);
    const { isCreateTeacherModalOpen } = useSelector((state) => state.popup);
    const [showModal, setShowModal] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("all");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);
  
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      department: "",
      expertise: "",
      maxStudents: 10,
    });
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllUsers());
    }, []);
    const teachers = useMemo(() => {
       (users || []).filter(
        (u) => u.role?.toLowerCase() === "teacher",
      );
      
    }, [users, projects]);
  
    const departments = useMemo(() => {
      const set = new Set(
        (teachers || []).map((t) => t.department).filter(Boolean),
      );
      return Array.from(set);
    }, [teachers]);
  
    const filteredTeachers = teachers.filter((teacher) => {
      const matchesSearch =
        (teacher.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.email || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterDepartment === "all" || student.department === filterDepartment;
      return matchesSearch && matchesFilter;
    });
      const handleCloseModal = () => {
    setShowModal(false);
    setEditingTeacher(null);
    setFormData({
      name: "",
      email: "",
      department: "",
      expertise: "",
      maxStudents: 10,
    });
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      if (editingTeacher) {
        dispatch(
          updateStudent({
            id: editingTeacher._id,
            data: formData,
          }),
        )
      handleCloseModal();
    };
  
    const handleEdit = (teacher) => {
      setEditingStudent(teacher);
      setFormData({
        name: teacher.name,
        email: teacher.email,
        department: teacher.department,
        expertise: Array.isArray(teacher.expertise) ? teacher.expertise[0] : teacher.expertise,
        maxStudents: typeof teacher.maxStudents === "number" ? teacher.maxStudents : 10,
      });
      setShowModal(true);
    };
  
    const handleDelete = (teacher) => {
      setTeacherToDelete(teacher);
      setShowDeleteModal(true);
    };
  
    const confirmDelete = () => {
      if (teacherToDelete) {
        dispatch(deleteTeacher(teacherToDelete._id));
        setShowDeleteModal(false);
        setTeacherToDelete(null);
      }
    };
  
    const cancelDelete = () => {
      setShowDeleteModal(false);
      setTeacherToDelete(null);
    };
  return <>
  
  </>;
};
}
export default ManageTeachers;
