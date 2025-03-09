const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/users.routes");
const { courseRoute } = require("./routes/courses.route");
const { videoRoute } = require("./routes/videos.route");
const cors = require('cors')


require("dotenv").config();
const jwt = require("jsonwebtoken");
const { paymentRouter } = require("./routes/payments.routes");
const quizRouter = require("./routes/quizRoutes");

const app = express();

app.use(cors())



app.use(express.json());

app.use("/users", userRouter);

app.use("/courses", courseRoute);

app.use("/videos", videoRoute);

app.use("/payment", paymentRouter);
app.use("/quiz", quizRouter);


app.get("/regenerateToken", (req, res) => {
  const rToken = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(rToken, "learnlink");

  if (decoded) {
    const token = jwt.sign(
      { userId: decoded.userId, user: decoded.user },
      "learnlink",
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json({ msg: "token created", token });
  } else {
    res.status(400).json({ msg: "not a valid Refresh Token" });
  }
});

app.get('/',(req,res)=>{
  try{
    res.status(200).json({message:"Welcome to Learn Link's Backend"})
  }catch(err){
    res.status(400).json({ message: "Some Error Occur. Please Refresh" });
  }
})

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`connected to db`);
    console.log(`connected to port ${process.env.port}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
});
