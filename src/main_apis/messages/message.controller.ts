
export const receiveMessage = async (req, res) => {
  try {

    const { message } = req.body;

     console.log("message =>", message);


    return res.status(201).json({
      reply: "Meessage received successfully",
    });
  } catch (error) {
    console.error("❌ Error creating student record:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};