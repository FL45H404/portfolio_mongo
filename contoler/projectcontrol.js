const db = require('../db')
const Project = require('../model/project')
// exports.addproject = async (req, res) => {
//     try {
//         var img = req.file.filename;
//         const data = [req.body.title,
//         req.body.description,
//         img,
//         req.body.link,
//         new Date()]
//         db.query('insert into projects (title,description,img,link,created_date) values (?,?,?,?,?)', data, (err, result) => {
//             if (err) return err;
//             res.status(201);
//             return res.redirect('project')
//         })
//     } catch (err) {
//         res.status(400).send(err)
//     }
// }

exports.addproject = async (req, res) => {
    try {
        const projects = new Project({
            title: req.body.title,
            description: req.body.description,
            img: req.file.filename,
            link: req.body.link
        })
        const data = await projects.save()
        res.status(201)
        return res.redirect('project')
    } catch (err) {
        res.status(400).send(err)
    }
}

// exports.get = async (req, res) => {
//     try {
//         const data = [req.params.id];
//         db.query('SELECT * FROM projects WHERE id=?', data, (err, result) => {
//             if (err) throw err;
//             console.log(result)
//             if (result.length > 0) {
//                 res.render('edit', { result: result })
//             }
//             else {
//                 res.send('no data')
//             }
//         })
//     } catch (err) {
//         res.status(400).send(err)
//     }
// }

exports.get = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Project.findOne({ _id: id })
        if (result) {
            res.render('edit', { result: result })
        } else {
            res.send('no data')
        }
    } catch (err) {
        res.status(400).send(err)
    }
}


// exports.update = async (req, res) => {
//     try {
//         var img = req.file.filename;
//         const id = [req.params.id]
//         const data = [
//             req.body.title,
//             req.body.description,
//             img,
//             req.body.link,
//             id
//         ]
//         db.query("update projects set title=?,description=?,img=?,link=? where id=?", data, (err, result) => {
//             if (err) res.send(err)
//             console.log(result)
//             res.redirect('/admin/projects')
//         })
//     } catch (err) {
//         res.send(err)
//     }
// }

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            title: req.body.title,
            description: req.body.description,
            img: req.file.filename,
            link: req.body.link
        }
        const result = await Project.findOneAndUpdate({ _id: id }, { $set: data })
        res.redirect('/admin/projects')
    } catch (err) {
        res.send(err)
    }
}

// exports.deleteproject = async (req, res) => {
//     try {
//         const data = [req.params.id];
//         db.query("delete from projects where id=?", data, (err, result) => {
//             if (err) res.send(err);
//             res.redirect('/admin/projects')
//         })
//     } catch (err) {
//         res.send(err)
//     }
// }
exports.deleteproject = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Project.deleteOne({ _id: id })
        res.redirect('/admin/projects')
    } catch (err) {  
        res.send(err)
    }
}