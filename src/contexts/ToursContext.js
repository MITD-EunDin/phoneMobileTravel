import { createContext, useState, useEffect } from 'react';
import { getAllTours } from '../api/TourApi';

export const ToursContext = createContext();

export const ToursProvider = ({ children }) => {
    const [tours, setTours] = useState([]);
    const [error, setError] = useState(null); // Thêm trạng thái lỗi

    // Lấy danh sách tour từ API khi khởi tạo
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const tourData = await getAllTours();
                console.log('Dữ liệu tour từ API:', tourData);

                if (!Array.isArray(tourData)) {
                    console.error('Dữ liệu tour không hợp lệ:', tourData);
                    setError('Dữ liệu tour không hợp lệ.');
                    setTours([]);
                    return;
                }

                // Ánh xạ trường images thành image (lấy ảnh đầu tiên)
                const mappedTours = tourData.map(tour => ({
                    ...tour,
                    image: tour.images && Array.isArray(tour.images) && tour.images.length > 0 ? tour.images[0] : null,
                }));

                // Kiểm tra trường image sau khi ánh xạ
                mappedTours.forEach(tour => {
                    if (!tour.image) {
                        console.warn(`Tour ${tour.tourName} thiếu ảnh hợp lệ`);
                    } else {
                        console.log(`URL ảnh tour ${tour.tourName}: ${tour.image}`);
                    }
                });

                setTours(mappedTours);
                setError(null); // Xóa lỗi nếu thành công
            } catch (err) {
                const errorMessage = err.message || 'Không thể lấy danh sách tour.';
                console.error('Lỗi khi lấy tour:', errorMessage, err);
                setError(errorMessage);
                setTours([]);
            }
        };

        fetchTours();
    }, []);

    return (
        <ToursContext.Provider value={{ tours, error }}>
            {children}
        </ToursContext.Provider>
    );
};