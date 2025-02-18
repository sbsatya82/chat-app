import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export const getUsersForSideBar = async (req, res) => {
  try {
    const logedInUserId = req.user._id;
    const filtteredUsers = await User.find({
      _id: {
        $ne: logedInUserId
      }
    }).select("-password");

    res.status(200).send(filtteredUsers);
  } catch (error) {
    console.error("error in getuserforsidebar method :" + error);
    res.status(500).send(error);
  }
}


export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: senderId, recipient: userToChatId },
        { sender: userToChatId, recipient: senderId },
      ],
    })
      .populate('sender recipient')
      .sort({ createdAt: 1 });


    res.status(200).send(messages);

  } catch (error) {
    console.error("error in getmessage method :" + error);
    res.status(500).send(error);
  }
};


export const sendMessage = async(req, res) => {
  try {
    const {text, image} = req.body;
    const senderId = req.user._id;
    const recipientId = req.params.id; 


    let imageUrl ;

    const newMessae = new Message ({
      text,
      image : imageUrl,
      sender: senderId,
      recipient: recipientId,
    });

    await newMessae.save();

    //realtime functionality => socket connection

    res.status(201).send(newMessae);
  } catch (error) {
    console.error("error in sendmessage method :" + error);
    res.status(500).send(error);
  }
}