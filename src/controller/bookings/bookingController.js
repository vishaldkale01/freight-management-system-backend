const { bookings , customers , clients , drivers , driverDocuments , vehicles} = require("../../model");
const { Op, Model } = require("sequelize");
const Booking = bookings;
// Create a new booking
const createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    bookings.belongsTo(customers, { foreignKey: "customer_id" });
    bookings.belongsTo(clients, { foreignKey: "client_id" });
    bookings.belongsTo(drivers, { foreignKey: "driver_id"});
    drivers.belongsTo(driverDocuments, { foreignKey: 'driver_id'});


    const booking = await bookings.findAll({
        include: [
            { model: customers  },
            { model: clients,  },
            { model: drivers ,
            include : [
                {model : driverDocuments}
            ]
            },
          ],
    });
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findByPk(bookingId);
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a booking by ID
const updateBookingById = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const [updatedRows] = await Booking.update(req.body, {
      where: { booking_id: bookingId },
    });

    if (updatedRows > 0) {
      res.status(200).json({ message: "Booking updated successfully" });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const deletedRows = await Booking.destroy({
      where: { booking_id: bookingId },
    });

    if (deletedRows > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
};
