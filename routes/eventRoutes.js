const express = require('express');
const router = express.Router();
const EventDetail = require('../models/EventDetail'); // Adjust the path as per your project structure
const QRCode = require('qrcode');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
// Route to add a new event
router.post('/add-event', async (req, res) => {
    try {
        const newEvent = new EventDetail({
            ...req.body,
            creatorId: req.userId
        });
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (error) {
        console.error("Error saving event:", error);
        res.status(400).json({ message: error.message });
    }
});

// Route to get all events
router.get('/events', async (req, res) => {
    try {
        const events = await EventDetail.find();
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: error.message });
    }
});

// eventRoutes.js
router.get('/event/:id', async (req, res) => {
    try {
        const event = await EventDetail.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/add-event/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await EventDetail.findById(eventId);

        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ message: error.message });
    }
});

// Route to update an event
// Assuming the event's ID is passed as a URL parameter
router.put('/update-event/:id', async (req, res) => {
    try {
        const updatedEvent = await EventDetail.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(400).json({ message: error.message });
    }
});

// Route to delete an event
// Assuming the event's ID is passed as a URL parameter
router.delete('/delete-event/:id', async (req, res) => {
    try {
        const deletedEvent = await EventDetail.findByIdAndDelete(req.params.id);
        res.json(deletedEvent);
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(400).json({ message: error.message });
    }
});


// router.post('/book-event/:eventId', async (req, res) => {
//     try {
//         const { seatsToBook, userId } = req.body;
//         const seatsNumber = parseInt(seatsToBook, 10);

//         if (isNaN(seatsNumber) || seatsNumber <= 0) {
//             return res.status(400).json({ message: "Invalid number of seats to book." });
//         }

//         const event = await EventDetail.findById(req.params.eventId);
//         if (!event || event.totalEntries < seatsNumber) {
//             return res.status(400).json({ message: "Insufficient seats available." });
//         }

//         event.totalEntries -= seatsNumber;
//         await event.save();

//         let ticketData = {
//             userId: userId,
//             eventName: event.name,
//             seatsBooked: seatsNumber,
//             eventDate: event.fromDate.toISOString().split('T')[0]
//         };

//         QRCode.toDataURL(JSON.stringify(ticketData), function (err, qrCodeUrl) {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ message: "Error generating QR code." });
//             }

//             let htmlContent = `
//             <html>
//             <body>
//                 <h1>${ticketData.eventName}</h1>
//                 <p>Date: ${ticketData.eventDate}</p>
//                 <p>UserID: ${ticketData.userId}</p>
//                 <p>Seats: ${ticketData.seatsBooked}</p>
//                 <img src="${qrCodeUrl}" alt="QR Code" />
//             </body>
//             </html>`;

//             // Convert to PDF
//             pdf.create(htmlContent).toBuffer(function (pdfErr, buffer) {
//                 if (pdfErr) {
//                     console.error(pdfErr);
//                     return res.status(500).json({ message: "Error generating PDF." });
//                 }

//                 // Send buffer as a downloadable response
//                 res.type('pdf');
//                 res.end(buffer, 'binary');
//             });
//         });

//     } catch (error) {
//         console.error("Error booking event:", error);
//         res.status(500).json({ message: error.message });
//     }
// });


router.post('/book-event/:eventId', async (req, res) => {
    try {
        const { seatsToBook, userId } = req.body;
        const seatsNumber = parseInt(seatsToBook, 10);

        if (isNaN(seatsNumber) || seatsNumber <= 0) {
            return res.status(400).json({ message: "Invalid number of seats to book." });
        }

        const event = await EventDetail.findById(req.params.eventId);
        if (!event || event.totalEntries < seatsNumber) {
            return res.status(400).json({ message: "Insufficient seats available." });
        }

        event.totalEntries -= seatsNumber;
        await event.save();

        let ticketData = {
            userId: userId,
            eventName: event.name,
            seatsBooked: seatsNumber,
            eventDate: event.fromDate.toISOString().split('T')[0]
        };

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = `
            <html>
            <body>
                <h1>${ticketData.eventName}</h1>
                <p>Date: ${ticketData.eventDate}</p>
                <p>UserID: ${ticketData.userId}</p>
                <p>Seats: ${ticketData.seatsBooked}</p>
            </body>
            </html>`;

        await page.setContent(content);
        const pdfBuffer = await page.pdf();

        await browser.close();

        // Send buffer as a downloadable response
        res.type('pdf');
        res.end(pdfBuffer, 'binary');
    } catch (error) {
        console.error("Error booking event:", error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;


