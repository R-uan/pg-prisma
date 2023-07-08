import { db } from "./postgres.js";
// Se reclamar que eu não separei as queries em outro arquivo vai tomar tapa

async function getAll(req, res) {
    db.query("SELECT * from contacts", (error, result) => {
        if (error) {
            console.log(error.message);
        }
        const { rows } = result;
        res.send(rows);
    });
}

async function postOne(req, res) {
    try {
        const { username, email, phone } = req.body;
        const text =
            "INSERT INTO contacts(id, username, email, phone) VALUES(DEFAULT, $1, $2, $3) RETURNING *";
        const values = [username, email, phone];
        const duplicatedEmail = await db.query(`SELECT * FROM contacts WHERE email = $1;`, [email]);
        const duplicatedName = await db.query(`SELECT * FROM contacts WHERE username = $1;`, [
            username,
        ]);

        // Checa se há emails duplicados
        if (duplicatedEmail.rowCount > 0) {
            console.log("Email already registered");
            return res.status(400).json({ err: "Email already registered", email: req.body.email });
        }
        // Checa se há Usernames duplicados
        if (duplicatedName.rowCount > 0) {
            console.log("username already registered");
            return res
                .status(400)
                .json({ err: "Username already registered", username: req.body.username });
        }
        const query = await db.query(text, values);
        res.send(query.rows);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ err: error.message });
    }
}

async function getOneUsername(req, res) {
    try {
        const text = "SELECT * FROM contacts WHERE username = $1";
        const query = await db.query(text, [req.params.id]);

        if (result.rowCount === 0) {
            return res.status(404).send("Username was not found");
        }

        res.status(200).json({ status: "success", result: result.rows });
    } catch (error) {
        console.log(error.message);
    }
}

async function updateByEmail(req, res) {
    try {
        const { username, email, phone } = req.body;
        const query = await db.query("SELECT * FROM contacts WHERE email = $1", [req.params.id]);
        const duplicatedEmail = await db.query(`SELECT * FROM contacts WHERE email = $1;`, [email]);
        const duplicatedName = await db.query(`SELECT * FROM contacts WHERE username = $1;`, [
            username,
        ]);

        if (query.rowCount === 0) {
            return res.status(404).send("Email not found");
        }
        // Checa se há emails duplicados
        if (duplicatedEmail.rowCount > 0) {
            console.log("Email already in use");
            return res.status(400).json({ err: "Email already in use", email: req.body.email });
        }
        // Checa se há Usernames duplicados
        if (duplicatedName.rowCount > 0) {
            console.log("username already registered");
            return res
                .status(400)
                .json({ err: "Username already registered", username: req.body.username });
        }

        if (username) {
            const query = await db.query("UPDATE contacts SET username = $1 WHERE email = $2;", [
                username,
                req.params.id,
            ]);
        }

        if (email) {
            const query = await db.query("UPDATE contacts SET email = $1 WHERE email = $2;", [
                email,
                req.params.id,
            ]);
        }
        // Essa query me arrancou anos da minha vida
        if (phone) {
            const query = await db.query(
                `UPDATE contacts SET phone = $1 WHERE email = '${req.params.id}';`,
                [phone]
            );
        }
    } catch (error) {
        console.log(error);
    }

    res.status(200).json({ status: "success" });
}

async function deleteByEmail(req, res) {
    try {
        const text = "DELETE FROM contacts WHERE email = $1";
        const query = await db.query(text, [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).send("Email not found");
        }
        res.status(200).json({ status: "success", result: query.rows });
    } catch (error) {
        console.log(error.message);
    }
}

export { getAll, postOne, getOneUsername, deleteByEmail, updateByEmail };
