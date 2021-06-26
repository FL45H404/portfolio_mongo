const express = require('express')
const app=express();
const router = express.Router();

const { addproject, get, update, deleteproject } = require('../contoler/projectcontrol');

const multer = require('multer');
const path = require("path");
router.use('/public', express.static(path.join(__dirname, '/public')));

let File;
try {
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/projectImages');
        },
        filename: (req, file, cb) => {
            File = file.originalname;
            cb(null, Date.now() + '_' + File);
        }
    })
}
catch (err) {
    console.log(err);
}
const upload = multer({ storage: storage });
const single = upload.single('img');


router.post('/admin/project', single,addproject);
router.get('/admin/project/:id', get);
router.post('/admin/project/:id', single,update);
router.get('/admin/project/delete/:id', deleteproject);

// router.post('/companyMaster', upload.single('img'), async (req, res) => {
//     try {
//         if (req.file) {
//             console.log(req.file.filename)
//         } else {
//             console.log("no data found")
//         }
//         var companyid;
//         db.query("select * from company_master ORDER BY company_id DESC", (err, result) => {
//             if (result.length > 0 && result[0].company_id != null) {
//                 let lastId = (result[0].company_id);
//                 let id = (lastId.match(/(\d+)/));
//                 let intid = parseInt(id) + 1;
//                 companyid = 'CMP000000' + intid;

//             } else {
//                 companyid = 'CMP0000001';
//             }
//             var company_logo = "http://localhost:3500/public/" + req.file.filename;
//             var created_by = 'vipul';
//             var created_date = new Date();
//             const data = [
//                 companyid,
//                 req.body.company_name,
//                 req.body.company_registration_number,
//                 company_logo,
//                 req.body.company_registered_address1,
//                 req.body.company_registered_address2,
//                 req.body.company_registered_address3,
//                 req.body.city,
//                 req.body.state,
//                 req.body.pincode,
//                 req.body.country,
//                 req.body.gst_no,
//                 req.body.website,
//                 req.body.contact_no,
//                 req.body.alternative_contact_no,
//                 req.body.contact_person,
//                 req.body.tan,
//                 req.body.pan,
//                 req.body.email,
//                 req.body.alternative_email,
//                 req.body.company_type,
//                 req.body.industry,
//                 req.body.status,
//                 req.body.remarks,
//                 created_by,
//                 created_date
//             ]

//             var insertQuery = "INSERT INTO company_master(company_id,company_name, company_registration_number, company_logo, company_registered_address1, company_registered_address2, company_registered_address3, city, state, pincode, country, gst_no, website, contact_no, alternative_contact_no, contact_person, tan, pan, email, alternative_email, company_type, industry, status, remarks, created_by,created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//             db.query(insertQuery, data, (err, result) => {
//                 if (err) return res.send(err);
//                 console.log("Department record added Successfully")
//                 res.status(httpCodes.Created).json({ message: "Company_master record added Successfully" })

//             })
//         })
//     } catch (err) {
//         console.log(err.message)
//         res.status(httpCodes.InternalServerError).json(err.message)

//     }
// })


module.exports = router;