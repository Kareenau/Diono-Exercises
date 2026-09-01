document.addEventListener("DOMContentLoaded", function () {

    let workersData = [];
    let treatmentData = [];


    fetch("data/workers.json")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Could not load workers.json");
            }

            return response.json();

        })
        .then(function (data) {

            workersData = data;

            console.log("Workers Dataset:");
            console.table(workersData);

            loadClaimOptions();

            loadReport();

        })
        .catch(function (error) {

            console.error("Error loading workers.json:", error);

        });



    fetch("data/treatment.json")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Could not load treatment.json");
            }

            return response.json();

        })
        .then(function (data) {

            treatmentData = data;

            console.log("Treatment Dataset:");
            console.table(treatmentData);

            loadReport();

        })
        .catch(function (error) {

            console.error("Error loading treatment.json:", error);

        });


    function getValue(data, key) {

        if (!data) {
            return "";
        }

        return data[key] || "";

    }


    function setValue(id, value) {

        const element = document.getElementById(id);

        if (element) {

            element.textContent = value || "";

        }

    }



    function setCheckbox(id, value) {

        const checkbox = document.getElementById(id);

        if (!checkbox) {
            return;
        }

        const checkedValue =
            String(value || "").toLowerCase();

        checkbox.checked =
            checkedValue === "yes" ||
            checkedValue === "true" ||
            checkedValue === "1" ||
            checkedValue === "checked";

    }


    function setPainLevel(value) {

        const painChecks =
            document.querySelectorAll(".pain-check");

        painChecks.forEach(function (checkbox) {

            checkbox.checked =
                String(checkbox.dataset.pain) ===
                String(value);

        });

    }


    function loadClaimOptions() {

        const selector =
            document.getElementById("claimSelector");

        if (!selector) {
            return;
        }

        selector.innerHTML =
            '<option value="">Select a claim</option>';

        workersData.forEach(function (worker) {

            const option =
                document.createElement("option");

            option.value = worker.claimNumber;

            option.textContent =
                worker.claimNumber +
                " - " +
                worker.workerName;

            selector.appendChild(option);

        });


        selector.addEventListener("change", function () {

            const selectedClaimNumber =
                selector.value;

            if (!selectedClaimNumber) {
                clearReport();
                return;
            }

            loadReport(selectedClaimNumber);

        });

    }


    function loadReport(selectedClaimNumber) {


        if (
            workersData.length === 0 ||
            treatmentData.length === 0
        ) {

            return;

        }



        let worker;


        if (selectedClaimNumber) {

            worker = workersData.find(function (item) {

                return String(item.claimNumber).trim() ===
                       String(selectedClaimNumber).trim();

            });

        } else {

            worker = workersData[0];

        }


        if (!worker) {

            console.error("Worker not found");

            return;

        }


        const treatment =
            treatmentData.find(function (item) {

                return String(item.claimNumber).trim() ===
                       String(worker.claimNumber).trim();

            });


        console.log("Selected Worker:");
        console.log(worker);

        console.log("Matching Treatment:");
        console.log(treatment);


        setValue(
            "claimNumber",
            getValue(worker, "claimNumber")
        );


        setValue(
            "workerName",
            getValue(worker, "workerName")
        );


        setValue(
            "returnDate",
            getValue(worker, "returnDate")
        );


        setValue(
            "returnComment",
            getValue(worker, "returnComment")
        );


        setValue(
            "expectedReturnDate",
            getValue(worker, "expectedReturnDate")
        );


        setValue(
            "returnConcerns",
            getValue(worker, "returnConcerns")
        );


        setValue(
            "employerContact",
            getValue(worker, "employerContact")
        );


        setValue(
            "contactDate",
            getValue(worker, "contactDate")
        );


        setValue(
            "recoveryComments",
            getValue(worker, "recoveryComments")
        );


        setValue(
            "workerAppId",
            getValue(worker, "workerAppId")
        );


        setValue(
            "submittedDate",
            getValue(worker, "submittedDate")
        );


        setCheckbox(
            "notMissed",
            getValue(worker, "notMissed")
        );


        setCheckbox(
            "notReturned",
            getValue(worker, "notReturned")
        );


        setCheckbox(
            "returned",
            getValue(worker, "returned")
        );


        setCheckbox(
            "fullRegular",
            getValue(worker, "fullRegular")
        );


        setCheckbox(
            "fullReduced",
            getValue(worker, "fullReduced")
        );


        setCheckbox(
            "modifiedRegular",
            getValue(worker, "modifiedRegular")
        );


        setCheckbox(
            "modifiedReduced",
            getValue(worker, "modifiedReduced")
        );


        setCheckbox(
            "otherWorking",
            getValue(worker, "otherWorking")
        );


        setCheckbox(
            "notRecovered",
            getValue(worker, "notRecovered")
        );


        setCheckbox(
            "recovered",
            getValue(worker, "recovered")
        );


        if (treatment) {

            setPainLevel(
                getValue(treatment, "painLevel")
            );


            setValue(
                "medicalProvider",
                getValue(treatment, "medicalProvider")
            );


            setValue(
                "lastTreatmentDate",
                getValue(treatment, "lastTreatmentDate")
            );


            setValue(
                "medicalProviderName",
                getValue(treatment, "medicalProviderName")
            );


            setValue(
                "nextTreatment",
                getValue(treatment, "nextTreatment")
            );


            setValue(
                "treatmentFrequency",
                getValue(treatment, "treatmentFrequency")
            );


            setValue(
                "medicationName",
                getValue(treatment, "medicationName")
            );


            setValue(
                "exercises",
                getValue(treatment, "exercises")
            );


            setValue(
                "additionalInformation",
                getValue(treatment, "additionalInformation")
            );


            setCheckbox(
                "notReceivingTreatment",
                getValue(treatment, "notReceivingTreatment")
            );


            setCheckbox(
                "receivingTreatment",
                getValue(treatment, "receivingTreatment")
            );


            setCheckbox(
                "notTakingMedication",
                getValue(treatment, "notTakingMedication")
            );


            setCheckbox(
                "takingMedication",
                getValue(treatment, "takingMedication")
            );


            setCheckbox(
                "notDoingExercises",
                getValue(treatment, "notDoingExercises")
            );


            setCheckbox(
                "doingExercises",
                getValue(treatment, "doingExercises")
            );

        }


        setValue(
            "workerAppId2",
            getValue(worker, "workerAppId")
        );


        setValue(
            "submittedDate2",
            getValue(worker, "submittedDate")
        );


        setValue(
            "workerAppId3",
            getValue(worker, "workerAppId")
        );


        setValue(
            "submittedDate3",
            getValue(worker, "submittedDate")
        );


        console.log(
            "Report populated successfully."
        );

    }


    function clearReport() {

        const ids = [

            "claimNumber",
            "workerName",
            "returnDate",
            "returnComment",
            "expectedReturnDate",
            "returnConcerns",
            "employerContact",
            "contactDate",
            "recoveryComments",
            "workerAppId",
            "submittedDate",

            "workerAppId2",
            "submittedDate2",

            "workerAppId3",
            "submittedDate3",

            "medicalProvider",
            "lastTreatmentDate",
            "medicalProviderName",
            "nextTreatment",
            "treatmentFrequency",
            "medicationName",
            "exercises",
            "additionalInformation"

        ];


        ids.forEach(function (id) {

            setValue(id, "");

        });



        document
            .querySelectorAll(".pain-check")
            .forEach(function (checkbox) {

                checkbox.checked = false;

            });

        document
            .querySelectorAll('input[type="checkbox"]')
            .forEach(function (checkbox) {

                checkbox.checked = false;

            });

    }

});