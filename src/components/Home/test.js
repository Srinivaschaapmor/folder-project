const handleCheckboxChange = (
  e,
  employeeId,
  employeeName,
  employeeDepartment,
  fileName,
  employeeDetails
) => {
  const sharedDate = new Date();
  if (employeeDetails) {
    console.log("EMPLOYEEEEEEE", employeeDetails);
    employeeDetails.forEach((employee) => {
      // let { employeeId, employeeName, employeeDepartment, fileName } =
      //   employee;

      console.log(`handlechange employeeId`, employee.employeeId);
      console.log(`handlechange employeeName`, employee.employeeName);
      console.log(
        `handlechange employeeDepartment`,
        employee.employeeDepartment
      );
      console.log(`handlechange fileName`, employee.fileName);
      //
      const updateSharedEmployees = (sharedEmployees) => {
        console.log(`handle Checkbox change = array ==>`, checkedEmployees);
        const newShared = [...sharedEmployees];
        newShared.push({
          employeeId: employee.employeeId,
          employeeName: employee.employeeName,
          employeeDepartment: employee.employeeDepartment,
          sharedDate,
        });
        console.log("-----NEW SHARED-----", employee.employeeId, newShared);
        return newShared;

        // if (!e.target.checked) {
        //   console.log(
        //     "sharedemployees",
        //     sharedEmployees.filter(
        //       (employeeObj) => employeeObj.employeeId !== employee.employeeId
        //     )
        //   );
        //   return sharedEmployees.filter(
        //     (employeeObj) => employeeObj.employeeId !== employee.employeeId
        //   );
        // } else {
        //   console.log("New employee:", [
        //     ...sharedEmployees,
        //     {
        //       id: employee.employeeId,
        //       name: employee.employeeName,
        //       dept: employeeDepartment,
        //       date: sharedDate,
        //     },
        //   ]);
        //   return [
        //     ...sharedEmployees,
        //     {
        //       employeeId: employee.employeeId,
        //       employeeName: employee.employeeName,
        //       employeeDepartment: employee.employeeDepartment,
        //       sharedDate,
        //     },
        //   ];
        // }
      };

      //

      console.log(`Previous dbstorage inside handle change`, dbStorage);
      let updatedDbStorage;
      dbStorage[pathname].map((item) => {
        console.log(`db storage item`, item);
        if (item.file.name === employee.fileName) {
          let newShared = updateSharedEmployees(item.shared);
          console.log(`------------SHARED BEFORE UPDATING`, item.shared);
          updatedDbStorage = { ...item, shared: newShared };
        }
      });

      // const updatedDbStorage = dbStorage[pathname].map((item) => {
      //   console.log(`db storage item`, item);
      //   if (item.file.name === employee.fileName) {
      //     let newShared = updateSharedEmployees(item.shared);
      //     console.log(`------------SHARED BEFORE UPDATING`, item.shared);
      //     return { ...item, shared: newShared };
      //   }
      //   return item;
      // });

      if (updatedDbStorage) {
        console.log("---UPDATED DB----", updatedDbStorage);
        setDbStorage((prev) => ({ ...prev, [pathname]: updatedDbStorage }));
      }

      // setCheckedEmployees((prev) =>
      //   prev.includes(employeeId)
      //     ? prev.filter((id) => id !== employeeId)
      //     : [...prev, employeeId]
      // );

      console.log(`updated dbstorage inside handle change`, updatedDbStorage);
    });
  } else {
    // let { employeeId, employeeName, employeeDepartment, fileName } = employee;

    console.log(`handlechange employeeId`, employeeId);
    console.log(`handlechange employeeName`, employeeName);
    console.log(`handlechange employeeDepartment`, employeeDepartment);
    console.log(`handlechange fileName`, fileName);
    //
    const updateSharedEmployees = (sharedEmployees) => {
      console.log(`handle Checkbox change = array ==>`, checkedEmployees);
      if (checkedEmployees.includes(employeeId)) {
        console.log(
          "sharedemployees",
          sharedEmployees.filter(
            (employee) => employee.employeeId !== employeeId
          )
        );
        return sharedEmployees.filter(
          (employee) => employee.employeeId !== employeeId
        );
      } else {
        console.log("New employee:", [
          ...sharedEmployees,
          { employeeId, employeeName, employeeDepartment, sharedDate },
        ]);
        return [
          ...sharedEmployees,
          { employeeId, employeeName, employeeDepartment, sharedDate },
        ];
      }
    };

    //

    console.log(`Previous dbstorage inside handle change`, dbStorage);
    const updatedDbStorage = dbStorage[pathname].map((item) => {
      console.log(`db storage items`, item);
      if (item.file.name === fileName) {
        let newShared = item.shared;
        return { ...item, shared: updateSharedEmployees(item.shared) };
      }
      return item;
    });
    setDbStorage((prev) => ({ ...prev, [pathname]: updatedDbStorage }));

    // setCheckedEmployees((prev) =>
    //   prev.includes(employeeId)
    //     ? prev.filter((id) => id !== employeeId)
    //     : [...prev, employeeId]
    // );

    console.log(`updated dbstorage inside handle change`, updatedDbStorage);
  }
};

console.log(checkedEmployees);

const handleShareClick = () => {
  console.log("Shared employees:", checkedEmployees);
  setCheckedEmployees([]);
  setAdd(false);
  setDepartment("");
  fetchSelectedFiles(selectedFileDetails);
  toast.success("File Shared Successfully");
};
const [selectAll, setSelectAll] = useState([]);
console.log(selectAll);

const handleSelectAll = (event, fileName) => {
  const isChecked = event.target.checked;
  let selectedEmployeeIds = []; // Copy the previously selected employee IDs
  // console.log(checkedEmployees);
  // Extract the IDs and names of the employees in the current department
  const currentEmployeeIds =
    employees[department]?.map((employee) => employee.id) || [];
  const currentEmployeeNames =
    employees[department]?.map((employee) => employee.name) || [];

  if (isChecked) {
    // Add the IDs from the current department to the selectedEmployeeIds array
    selectedEmployeeIds = [...currentEmployeeIds];
    // setCheckedEmployees()

    // console.log(`selectedEmployeeIds`, selectedEmployeeIds);
    // // setCheckedEmployees((prev) =>
    // //   prev.includes(employeeId)
    // //     ? prev.filter((id) => id !== employeeId)
    // //     : [...prev, employeeId]
    // // );
    // selectedEmployeeIds.forEach((employeeId) => {
    //   // console.log(`are bachha prev`, dbStorage);
    //   console.log("employeeId", employeeId);
    //   handleCheckboxChange(
    //     employeeId,
    //     currentEmployeeNames[selectedEmployeeIds.indexOf(employeeId)],
    //     department,
    //     fileName
    //   );
    //   // console.log(`are bachha next`, dbStorage);
    // });
    let selectedEmployees = [
      {
        employeeId: 1001,
        employeeName: currentEmployeeNames[selectedEmployeeIds.indexOf(1001)],
        employeeDepartment: department,
        fileName: fileName,
      },
      {
        employeeId: 1002,
        employeeName: currentEmployeeNames[selectedEmployeeIds.indexOf(1002)],
        employeeDepartment: department,
        fileName: fileName,
      },
    ];

    handleCheckboxChange(null, null, null, null, null, selectedEmployees);

    // handleCheckboxChange(
    //   1001,
    //   currentEmployeeNames[selectedEmployeeIds.indexOf(1001)],
    //   department,
    //   fileName
    // );
    // handleCheckboxChange(
    //   1002,
    //   currentEmployeeNames[selectedEmployeeIds.indexOf(1002)],
    //   department,
    //   fileName
    // );
    // console.log(`are bachha next`, dbStorage);
  } else {
    // Deselect all employees
    selectedEmployeeIds.length = 0;
  }
  console.log("selectedemployeeids", selectedEmployeeIds);
  // Update the checked employees in the state
  setCheckedEmployees(selectedEmployeeIds);
  setSelectAllChecked(isChecked);

  // Call handleCheckboxChange for each selected employee
};

useEffect(() => {
  setSelectAllChecked(false);
}, [department]);

//   useEffect(() => {
// setSelectedFileDetails
//   }, [dbStorage])

console.log(checkedEmployees);
const handleCancel = () => {
  setAdd(false);
  setDepartment("");
};
