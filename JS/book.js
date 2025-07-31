// ==============================
// Seat Layout Generation
// ==============================
const seatsContainer = document.getElementById("seatsContainer");
const selectedSeats = [];
const totalSeats = 32;
let bookedSeats = 10; // Example

function createSeat(number) {
  const seat = document.createElement("div");
  seat.classList.add("seat");
  seat.textContent = number;
  seat.dataset.id = number;

  if (number <= bookedSeats) {
    seat.classList.add("booked");
    seat.title = "Booked";
  }

  seat.addEventListener("click", () => {
    const limit = parseInt(document.getElementById("seats").value || 0);
    if (seat.classList.contains("booked")) return;

    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
      selectedSeats.splice(selectedSeats.indexOf(seat.dataset.id), 1);
    } else {
      if (selectedSeats.length >= limit) return;
      seat.classList.add("selected");
      selectedSeats.push(seat.dataset.id);
    }
  });

  return seat;
}

function createSeats(total) {
  seatsContainer.innerHTML = "";
  let seatNum = 1;

  for (let r = 0; r < total / 4; r++) {
    const row = document.createElement("div");
    row.classList.add("seat-row");

    const left = document.createElement("div");
    left.classList.add("seat-group");
    left.appendChild(createSeat(seatNum++));
    left.appendChild(createSeat(seatNum++));

    const right = document.createElement("div");
    right.classList.add("seat-group");
    right.appendChild(createSeat(seatNum++));
    right.appendChild(createSeat(seatNum++));

    row.appendChild(left);
    row.appendChild(right);
    seatsContainer.appendChild(row);
  }
}

// Initialize seat layout
createSeats(32);

// ==============================
// Pricing Logic
// ==============================
const ticketPrices = {
  chennai: { madurai: 700, trichy: 500, kanyakumari: 800, coimbatore: 600, erode: 900, salem: 1100 },
  coimbatore: { madurai: 600, trichy: 550, kanyakumari: 900, chennai: 600, erode: 700, salem: 1100 },
  erode: { madurai: 700, trichy: 600, kanyakumari: 800, chennai: 900, coimbatore: 700, salem: 1000 },
  madurai: { trichy: 400, kanyakumari: 700, chennai: 700, coimbatore: 600, erode: 800, salem: 1100 },
  kanyakumari: { madurai: 800, trichy: 900, chennai: 800, coimbatore: 900, erode: 700, salem: 900 },
  trichy: { madurai: 400, kanyakumari: 900, chennai: 500, coimbatore: 550, erode: 600, salem: 1100 },
  salem: { madurai: 800, trichy: 700, kanyakumari: 900, coimbatore: 600, erode: 500, chennai: 900 },
};

function updatePrice() {
  const source = document.getElementById("source").value;
  const destination = document.getElementById("destination").value;
  const busType = document.getElementById("busType").value;
  const priceInput = document.getElementById("ticketPrice");

  if (ticketPrices[source] && ticketPrices[source][destination]) {
    let basePrice = ticketPrices[source][destination];
    if (busType === "AC") basePrice += 200;
    priceInput.value = basePrice;
  } else {
    priceInput.value = "";
  }
}

document.getElementById("source").addEventListener("change", updatePrice);
document.getElementById("destination").addEventListener("change", updatePrice);
document.getElementById("busType").addEventListener("change", updatePrice);

// ==============================
// Bus Options Based on Type
// ==============================
const busOptions = {
  AC: [
    { value: "Volvo 9600", label: "Volvo 9600" },
    { value: "YBM", label: "YBM Travels" },
    { value: "KPN AC", label: "KPN AC Deluxe" },
    { value: "SRM AC", label: "SRM AC" },
  ],
  "Non-AC": [
    { value: "SRM Non-AC", label: "SRM Non-AC" },
    { value: "Parveen Classic", label: "Parveen Classic" },
    { value: "Kallada Non-AC", label: "Kallada Non-AC" },
    { value: "SRS Non-AC", label: "SRS Non-AC" },
    { value: "VRL Non-AC", label: "VRL Non-AC" },
  ],
};

const busTypeSelect = document.getElementById("busType");
const busNameSelect = document.getElementById("busName");

busTypeSelect.addEventListener("change", function () {
  const selectedType = this.value;
  busNameSelect.innerHTML = '<option value="">Select Bus</option>';
  if (busOptions[selectedType]) {
    busOptions[selectedType].forEach((bus) => {
      const option = document.createElement("option");
      option.value = bus.value;
      option.textContent = bus.label;
      busNameSelect.appendChild(option);
    });
  }
});

// ==============================
// Pickup Times Based on Bus Name
// ==============================
const pickupTimes = {
  "Volvo 9600": ["6:00 PM", "7:30 PM", "9:00 PM"],
  "YBM": ["6:00 PM", "8:00 PM", "10:00 PM"],
  "KPN AC": ["5:00 PM", "8:00 PM"],
  "SRM AC": ["6:00 PM", "7:30 PM"],
  "SRM Non-AC": ["6:00 PM", "7:00 PM"],
  "Parveen Classic": ["9:00 PM", "11:00 PM"],
  "Kallada Non-AC": ["5:00 PM", "7:30 PM"],
  "SRS Non-AC": ["6:00 PM", "8:00 PM"],
  "VRL Non-AC": ["7:00 PM", "9:00 PM"],
};

const pickupTimeSelect = document.getElementById("pickupTime");
busNameSelect.addEventListener("change", function () {
  const selectedBus = this.value;
  pickupTimeSelect.innerHTML = '<option value="">Select Pickup Time</option>';
  if (pickupTimes[selectedBus]) {
    pickupTimes[selectedBus].forEach((time) => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      pickupTimeSelect.appendChild(option);
    });
  }
});

// ==============================
// Seat Button Toggle
// ==============================
document.getElementById("showSeatsBtn").addEventListener("click", () => {
  document.getElementById("seatLayoutSection").style.display = "block";
});
// ==============================
// Update Total Amount on Seat Selection
// ==============================

const seatsInput = document.getElementById("seats");
const ticketPriceInput = document.getElementById("ticketPrice");
const totalAmountDisplay = document.getElementById("totalAmount");

function updateTotalAmount() {
  const seatCount = parseInt(seatsInput.value) || 0;
  const price = parseInt(ticketPriceInput.value) || 0;
  const total = seatCount * price;
  totalAmountDisplay.textContent = total;
}

// When seats input changes manually
seatsInput.addEventListener("input", updateTotalAmount);

// Also update when ticket price changes
ticketPriceInput.addEventListener("input", updateTotalAmount);

// Call once on page load (optional)
updateTotalAmount();


// ==============================
// Final Booking Submission Handler
// ==============================
document.getElementById("bookNowBtn").addEventListener("click", () => {
  // Get selected values from form fields
  const source = document.getElementById("source").value;
  const destination = document.getElementById("destination").value;
  const busType = document.getElementById("busType").value;
  const busName = document.getElementById("busName").value;
  const pickupTime = document.getElementById("pickupTime").value;
  const seats = document.getElementById("seats").value;
  const ticketPrice = document.getElementById("ticketPrice").value;
  const totalAmount = document.getElementById("totalAmount").textContent;
  const selectedSeatNumbers = selectedSeats.join(", ");
  // ==============================
  // Validate form fields

  if (!source || !destination || !busType || !busName || !pickupTime || !seats || !ticketPrice) {
    alert("Please fill in all fields.");
    return;
  }
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }
  // ==============================
  // Display booking summary
  const bookingSummary = `
  Booking Summary:
  Source: ${source}
  Destination: ${destination}

  Bus Type: ${busType}
  Bus Name: ${busName}
  Pickup Time: ${pickupTime}
  Seats: ${seats}
  Ticket Price: ${ticketPrice}
  Total Amount: ${totalAmount}
  Selected Seats: ${selectedSeatNumbers}
  `;

  alert(bookingSummary);
});
// ==============================
// Reset Booking Form
// ==============================

document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("bookingForm").reset();
  seatsContainer.innerHTML = "";
  selectedSeats.length = 0;
  bookedSeats = 10; // Reset to initial booked seats
  createSeats(totalSeats);
  totalAmountDisplay.textContent = "0";
});
// ==============================
// Seat Selection Reset Button
document.getElementById("resetSeatsBtn").addEventListener("click", () => {
  const allSeats = document.querySelectorAll(".seat.selected");
  allSeats.forEach(seat => {
    seat.classList.remove("selected");
  });
  selectedSeats.length = 0;
  updateTotalAmount();
}
);
// ==============================
// Show/Hide Seat Layout Section  
document.getElementById("toggleSeatLayoutBtn").addEventListener("click", () => {
  const seatLayoutSection = document.getElementById("seatLayoutSection");
  if (seatLayoutSection.style.display === "none" || seatLayoutSection.style.display === "") {
    seatLayoutSection.style.display = "block";
  } else {
    seatLayoutSection.style.display = "none";
  }
}
);    
