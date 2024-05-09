const mongoose = require('mongoose');
const environment = require('./environment')

// Thông tin kết nối đến cơ sở dữ liệu MongoDB
const dbURI = environment.MONGODB_URI

// Kết nối đến cơ sở dữ liệu
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Lắng nghe sự kiện kết nối thành công
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Lắng nghe sự kiện kết nối lỗi
mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Lắng nghe sự kiện ngắt kết nối
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
