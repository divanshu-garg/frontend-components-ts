import { useState, type ReactNode } from "react";
import RightSidebar from "../RightSidebar";
import {
  Filter,
  Code,
  PenTool,
  Megaphone,
  User,
} from "lucide-react";


type Department =   "Engineering" |
"Design"|
"Marketing"|
"HR"|
"Sales"|
"Legal"

const DEPARTMENTS: Department[] = [
  "Engineering",
  "Design",
  "Marketing",
  "HR",
  "Sales",
  "Legal",
] as const;

type Employee = {id:number, name:string, role:string,department:Department}

const EMPLOYEES:Employee[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Dev",
    department: "Engineering",
  },
  { id: 2, name: "Bob Smith", role: "Backend Lead", department: "Engineering" },
  { id: 3, name: "Charlie Davis", role: "UI Designer", department: "Design" },
  {
    id: 4,
    name: "Diana Evans",
    role: "Marketing Manager",
    department: "Marketing",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    role: "DevOps Engineer",
    department: "Engineering",
  },
  { id: 6, name: "Fiona Gallagher", role: "HR Specialist", department: "HR" },
  { id: 7, name: "George Miller", role: "Sales Rep", department: "Sales" },
  {
    id: 8,
    name: "Hannah Montana",
    role: "Copywriter",
    department: "Marketing",
  },
  { id: 9, name: "Ian Wright", role: "Product Designer", department: "Design" },
  { id: 10, name: "Jack Sparrow", role: "Legal Counsel", department: "Legal" },
  { id: 11, name: "Kevin Hart", role: "Junior Dev", department: "Engineering" },
  {
    id: 12,
    name: "Liam Neeson",
    role: "Security Analyst",
    department: "Engineering",
  },
  {
    id: 13,
    name: "Alice Johnson",
    role: "Frontend Dev",
    department: "Engineering",
  },
  {
    id: 32,
    name: "Bob Smith",
    role: "Backend Lead",
    department: "Engineering",
  },
  { id: 33, name: "Charlie Davis", role: "UI Designer", department: "Design" },
  {
    id: 43,
    name: "Diana Evans",
    role: "Marketing Manager",
    department: "Marketing",
  },
  {
    id: 35,
    name: "Ethan Hunt",
    role: "DevOps Engineer",
    department: "Engineering",
  },
  { id: 63, name: "Fiona Gallagher", role: "HR Specialist", department: "HR" },
  { id: 73, name: "George Miller", role: "Sales Rep", department: "Sales" },
  {
    id: 83,
    name: "Hannah Montana",
    role: "Copywriter",
    department: "Marketing",
  },
  {
    id: 93,
    name: "Ian Wright",
    role: "Product Designer",
    department: "Design",
  },
  { id: 130, name: "Jack Sparrow", role: "Legal Counsel", department: "Legal" },
  {
    id: 131,
    name: "Kevin Hart",
    role: "Junior Dev",
    department: "Engineering",
  },
  {
    id: 132,
    name: "Liam Neeson",
    role: "Security Analyst",
    department: "Engineering",
  },
  {
    id: 31,
    name: "Alice Johnson",
    role: "Frontend Dev",
    department: "Engineering",
  },
  {
    id: 29,
    name: "Bob Smith",
    role: "Backend Lead",
    department: "Engineering",
  },
  { id: 39, name: "Charlie Davis", role: "UI Designer", department: "Design" },
  {
    id: 49,
    name: "Diana Evans",
    role: "Marketing Manager",
    department: "Marketing",
  },
  {
    id: 59,
    name: "Ethan Hunt",
    role: "DevOps Engineer",
    department: "Engineering",
  },
  { id: 96, name: "Fiona Gallagher", role: "HR Specialist", department: "HR" },
  { id: 79, name: "George Miller", role: "Sales Rep", department: "Sales" },
  {
    id: 89,
    name: "Hannah Montana",
    role: "Copywriter",
    department: "Marketing",
  },
  {
    id: 99,
    name: "Ian Wright",
    role: "Product Designer",
    department: "Design",
  },
  { id: 190, name: "Jack Sparrow", role: "Legal Counsel", department: "Legal" },
  {
    id: 119,
    name: "Kevin Hart",
    role: "Junior Dev",
    department: "Engineering",
  },
  {
    id: 129,
    name: "Liam Neeson",
    role: "Security Analyst",
    department: "Engineering",
  },
];


const getIcon = (dept:Department):ReactNode => {
  if (dept === "Engineering")
    return <Code size={24} className="text-blue-600" />;
  if (dept === "Design")
    return <PenTool size={24} className="text-purple-600" />;
  if (dept === "Marketing")
    return <Megaphone size={24} className="text-pink-600" />;
  return <User size={24} className="text-gray-600" />; // Default icon
};

const Team = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedDepts, setSelectedDepts] = useState<Department[]>([...DEPARTMENTS]);

  const handleCheckboxChange = (deptName:Department) => {
    setSelectedDepts((prev) => {
      if (prev.includes(deptName)) {
        // Uncheck: Return a new list WITHOUT this item
        return prev.filter((d) => d !== deptName);
      } else {
        // Check: Return a new list WITH this item added
        return [...prev, deptName];
      }
    });
  };

  const visibleEmployees = EMPLOYEES.filter((employee) =>
    selectedDepts.includes(employee.department),
  );

  return (
    <div className="flex h-full relative">
      <div className="flex-1 overflow-y-auto w-full p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Directory</h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded shadow-sm"
          >
            <Filter size={16} />
            <span>{isFilterOpen ? null : "Show Filters"}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white p-4 border rounded-lg shadow-sm flex items-center gap-4"
            >
              {/* 1. IMAGE (ICON) */}
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                {getIcon(emp.department)}
              </div>

              {/* 2. NAME & DEPT */}
              <div>
                <h3 className="font-bold text-gray-800">{emp.name}</h3>
                <p className="text-sm text-gray-500">{emp.role}</p>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {emp.department}
                </span>
              </div>
            </div>
          ))}
          {visibleEmployees.length === 0 && (
            <p className="text-gray-400 mt-10">
              No employees found. Check a box!
            </p>
          )}
        </div>
      </div>
      <RightSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <h3 className="font-bold text-gray-700 mb-4">Filter Departments</h3>

        {/* LOOP THROUGH DEPARTMENTS TO MAKE CHECKBOXES */}
        <div className="space-y-3">
          {DEPARTMENTS.map((deptName) => (
            <label
              key={deptName}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedDepts.includes(deptName)}
                onChange={() => handleCheckboxChange(deptName)}
                className="w-5 h-5"
              />
              <span>{deptName}</span>
            </label>
          ))}
        </div>
      </RightSidebar>
    </div>
  );
};

export default Team;
