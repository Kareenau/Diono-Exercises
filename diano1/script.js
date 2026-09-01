

const datasetSelect = document.getElementById("datasetSelect");



function fitPages() {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

     
        page.classList.remove(
            "compact-1",
            "compact-2",
            "compact-3"
        );

        
        let level = 0;

        while (
            page.scrollHeight > page.clientHeight &&
            level < 3
        ) {

            level++;

            page.classList.add(
                "compact-" + level
            );
        }

    });
}


function loadDataset(fileName) {

    fetch(fileName)

        .then(function(response) {

            if (!response.ok) {
                throw new Error("Could not load " + fileName);
            }

            return response.json();

        })

        .then(function(reportData) {


            document.getElementById("prescriptionDrugsBody").innerHTML = "";
            document.getElementById("overTheCounterDrugsBody").innerHTML = "";
            document.getElementById("medicalSuppliesBody").innerHTML = "";
            document.getElementById("parkingBody").innerHTML = "";
            document.getElementById("mileageBody").innerHTML = "";
            document.getElementById("busTaxiBody").innerHTML = "";



            document.getElementById("workerName").textContent =
                reportData.workerName;

            document.getElementById("claimNumber").textContent =
                reportData.claimNumber;

            document.getElementById("workerAppId").textContent =
                reportData.workerAppId;

            document.getElementById("submitted").textContent =
                reportData.submitted;


           

            document.getElementById("footerWorkerAppId").textContent =
                reportData.workerAppId;

            document.getElementById("footerSubmitted").textContent =
                reportData.submitted;

            document.getElementById("footerWorkerAppId2").textContent =
                reportData.workerAppId;

            document.getElementById("footerSubmitted2").textContent =
                reportData.submitted;



            reportData.prescriptionDrugs.forEach(function(drug) {

                const row = document.createElement("tr");

                row.innerHTML =
                    "<td>" + drug.drugName + "</td>" +
                    "<td>" + drug.prescriptionDate + "</td>" +
                    "<td>" + drug.datePurchased + "</td>" +
                    "<td>" + drug.healthcareProvider + "</td>" +
                    "<td>$" +
                    Number(drug.paidAmount).toFixed(2) +
                    "</td>";

                document
                    .getElementById("prescriptionDrugsBody")
                    .appendChild(row);

            });


            
            reportData.overTheCounterDrugs.forEach(function(drug) {

                const row = document.createElement("tr");

                row.innerHTML =
                    "<td>" + drug.drugName + "</td>" +
                    "<td>" + drug.datePurchased + "</td>" +
                    "<td>$" +
                    Number(drug.paidAmount).toFixed(2) +
                    "</td>" +
                    "<td>" + drug.seller + "</td>" +
                    "<td>" + drug.reason + "</td>";

                document
                    .getElementById("overTheCounterDrugsBody")
                    .appendChild(row);

            });



            reportData.medicalSupplies.forEach(function(supply) {

                const row = document.createElement("tr");

                row.innerHTML =
                    "<td>" + supply.itemPurchased + "</td>" +
                    "<td>" + supply.datePurchased + "</td>" +
                    "<td>" + supply.prescribed + "</td>" +
                    "<td>" + supply.healthcareProvider + "</td>" +
                    "<td>$" +
                    Number(supply.paidAmount).toFixed(2) +
                    "</td>" +
                    "<td>" + supply.seller + "</td>";

                document
                    .getElementById("medicalSuppliesBody")
                    .appendChild(row);

            });



            reportData.parking.forEach(function(parking) {

                const row = document.createElement("tr");

                const address =
                    parking.healthcareProviderAddress ||
                    parking.location ||
                    "";

                const meterUsed =
                    parking.meterUsed || "";

                const meterNumber =
                    parking.meterNumber || "";

                row.innerHTML =
                    "<td>" + address + "</td>" +
                    "<td>" + parking.date + "</td>" +
                    "<td>$" +
                    Number(parking.paidAmount).toFixed(2) +
                    "</td>" +
                    "<td>" + meterUsed + "</td>" +
                    "<td>" + meterNumber + "</td>";

                document
                    .getElementById("parkingBody")
                    .appendChild(row);

            });


            reportData.mileage.forEach(function(mileage) {

                const appointmentDate =
                    mileage.appointmentDate ||
                    mileage.date ||
                    "";

                const healthcareAddress =
                    mileage.healthcareProviderAddress ||
                    mileage.to ||
                    "";

                const workplaceAddress =
                    mileage.workplaceAddress ||
                    mileage.from ||
                    "";

                const row = document.createElement("tr");

                row.innerHTML =
                    "<td>" + appointmentDate + "</td>" +
                    "<td>" + healthcareAddress + "</td>" +
                    "<td>" + workplaceAddress + "</td>" +
                    "<td>" +
                    mileage.kilometers +
                    " km</td>";

                document
                    .getElementById("mileageBody")
                    .appendChild(row);

            });



            reportData.busTaxi.forEach(function(transport) {

                const appointmentDate =
                    transport.appointmentDate ||
                    transport.date ||
                    "";

                const startingPoint =
                    transport.startingPoint ||
                    transport.from ||
                    "";

                const healthcareAddress =
                    transport.healthcareProviderAddress ||
                    transport.to ||
                    "";

                const fare =
                    transport.totalFarePaid !== undefined
                        ? transport.totalFarePaid
                        : transport.paidAmount;

                const row = document.createElement("tr");

                row.innerHTML =
                    "<td>" + appointmentDate + "</td>" +
                    "<td>" + startingPoint + "</td>" +
                    "<td>" + healthcareAddress + "</td>" +
                    "<td>" + transport.transportationType + "</td>" +
                    "<td>$" +
                    Number(fare).toFixed(2) +
                    "</td>";

                document
                    .getElementById("busTaxiBody")
                    .appendChild(row);

            });
            
requestAnimationFrame(function() {
    fitPages();
});

        })

        .catch(function(error) {

            console.error(
                "Error loading dataset:",
                error
            );

        });

}




datasetSelect.addEventListener("change", function() {

    loadDataset(this.value);

});



loadDataset("data.json");