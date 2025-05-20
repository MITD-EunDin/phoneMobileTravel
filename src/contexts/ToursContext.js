import { createContext, useState, useEffect } from 'react';
import { getAllTours } from '../api/TourApi';

export const ToursContext = createContext();

export const ToursProvider = ({ children }) => {
    const [tours, setTours] = useState([]);

    // Lấy danh sách tour từ API khi khởi tạo
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const tourData = await getAllTours();
                console.log('Dữ liệu tour từ API:', tourData);

                if (!Array.isArray(tourData)) {
                    console.error('Dữ liệu tour không hợp lệ');
                    setTours([]);
                    return;
                }

                // Ánh xạ trường images thành image (lấy ảnh đầu tiên)
                const mappedTours = tourData.map(tour => ({
                    ...tour,
                    image: tour.images && tour.images.length > 0 ? tour.images[0] : null,
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
            } catch (err) {
                console.error('Lỗi khi lấy tour:', err);
            }
        };

        fetchTours();
    }, []); // Chạy một lần khi mount

    return (
        <ToursContext.Provider value={{ tours }}>
            {children}
        </ToursContext.Provider>
    );
};

// Hàm lọc tour
export const filterDomesticTours = (allTours) =>
    allTours.filter((tour) => tour.tourType?.toLowerCase() === 'domestic');

export const filterInternationalTours = (allTours) =>
    allTours.filter((tour) => tour.tourType?.toLowerCase() === 'international');

export const filterDiscountTours = (allTours) =>
    allTours.filter((tour) => tour.discount > 0);

export const filterPopular = (allTours) =>
    allTours.filter((tour) => tour.discount === 0 || tour.discount < 0 );

export const filterRegion = (allTours, region) => 
    allTours.filter((tour) => tour.region?.toLowerCase() === region.toLowerCase());

export const filterDuration = (allTours, duration) =>
    allTours.filter((tour) => tour.duration?.toLowerCase() === duration.toLowerCase());

export const filterKeyword = (allTours, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return allTours.filter(tour =>
        tour.keyword?.toLowerCase().includes(lowerKeyword) ||
        tour.tourName?.toLowerCase().includes(lowerKeyword)
    );
};
