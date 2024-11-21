require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

const app = express();
const upload = multer({ dest: '/tmp/uploads/' }); // Temporary upload folder
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend communication
app.use(cors());

// Initialize GoogleGenerativeAI and GoogleAIFileManager
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
app.get('/',async(req,res)=>{
  res.send('hey I am up ... working');
})
// Route to handle file upload and processing
app.post("/process-file", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path; // Path to the uploaded file
    const displayName = req.file.originalname;

    // Upload the file to Google Gemini
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: req.file.mimetype,
      displayName: displayName,
    });

    console.log(
      `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    );

    // Generate content using the uploaded file
    // const model = genAI.getGenerativeModel({
    //   model: "gemini-1.5-flash",
    // });

    // const result = await model.generateContent([
    //   {
    //     fileData: {
    //       mimeType: uploadResponse.file.mimeType,
    //       fileUri: uploadResponse.file.uri,
    //     },
    //   },
    //   { text: "Extract invoice data as JSON including invoices, products, and customers." },
    // ]);

    // // Attempt to parse the response as JSON
    // const jsonStart = result.response.text().indexOf("{");
    // const jsonEnd = result.response.text().lastIndexOf("}");
    // const extractedJSON = result.response.text().slice(jsonStart, jsonEnd + 1);

    // const data = JSON.parse(extractedJSON);
    const sampleData = {
        invoice: {
          number: 'INV-148CZS',
          date: '12 Nov 2024',
          supplier: {
            name: 'Elnvoices',
            gst: '29AABCT1332L000',
            address: 'H/No 1 59/9, M.S.R.Y Nilayam, 4th floor, Masjid Banda, Kondapur, Rangareddy, H-derabad Bangalore South, KARNATAKA, 560030',
            mobile: '+91 9999999999',
            email: 'Swipe@gmail.com'
          },
          customer: {
            name: 'NextSpeed Technologies Pvt Ltd',
            gst: 'ABCDE1234567890',
            phone: '9999999994'
          },
          consignee: { name: 'Shounak' },
          place_of_supply: '29-KARNATAKA',
          items: [
            { name: "GEMS CHOCLATE POUCH", quantity: 1000, unitPrice: 4.76, tax: 238.1, priceWithTax: 5000 },
            { name: "TREAT BKS CASE 80PKT", quantity: 50, unitPrice: 535.71, tax: 3214.29, priceWithTax: 30000 },
            { name: "NUTRI CHOICE BKS CASE", quantity: 25, unitPrice: 666.67, tax: 833.33, priceWithTax: 17500 },
            { name: "MILK BIKIS CLASSIC CASE 120PK", quantity: 20, unitPrice: 809.52, tax: 809.52, priceWithTax: 17000 }
          ],
          total_items: 4,
          total_quantity: 1095,
          making_charges: 123456,
          debit_card_charges: 12345,
          shipping_charges: 180,
          taxable_amount: 200385.76,
          cgst_2_5: 940.48,
          sgst_2_5: 940.48,
          cgst_6: 1607.14,
          sgst_6: 1607.14,
          total: 205481,
          amount_payable: 205481,
          total_amount_due: 205481,
          amount_in_words: 'INR Two Lakh, Five Thousand, Four Hundred And Eighty-One Rupees Only',
          bank_details: {
            bank: 'Example Bank',
            account_number: '1234567890',
            ifsc_code: 'IFSC0001234',
            branch: 'Main Branch',
            beneficiary_name: 'Vishnu'
          }
        }
      };
    // Send the parsed JSON data back to the frontend
    res.json(sampleData);
    //console.log('successfully got the data ',data)
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "File processing failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
