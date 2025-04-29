const tourData = {
    popularTrips: [
      {
        id: '1',
        title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
        image: require('../img/image 2.png'),
        imageTotal: {
          image1: require('../img/imageTotal1.png'), // Sửa dấu ngoặc
          image2: require('../img/imageTotal2.png'),
          image3: require('../img/imageTotal3.png'),
          image4: require('../img/imageTotal4.png'),

        },
        duration: '4 ngày 3 đêm',
        frequency: 'Hàng Tuần',
        transport: 'Ô tô/Máy bay',
        hotel:'Khách sạn 2-3 sao',
        price: '4.390.000',
        detailedInfo: {
          descriptionPart1: 'MÔ TẢ CHUYẾN ĐI\nChuyến đi khám phá vẻ đẹp thiên nhiên hùng vĩ của Sapa, với những ruộng bậc thang xanh mướt và văn hóa đa dạng của các dân tộc thiểu số.\nNGÀY 01 | HÀ NỘI – SAPA\nKhởi hành từ Hà Nội, đến Sapa, tham quan bản Cát Cát.\nNGÀY 02 | SAPA\nChinh phục đỉnh Fansipan, ngắm cảnh thung lũng Mường Hoa.\nNGÀY 03 | SAPA\nTham quan thác Bạc, cầu Mây, tự do khám phá chợ đêm Sapa.\nNGÀY 04 | SAPA – HÀ NỘI\nTrở về Hà Nội, kết thúc hành trình.',
        descriptionPart2: 'LỊCH TRÌNH CHUYẾN ĐI\n• Quý khách tham quan bản Cát Cát – ngôi làng của người H’Mông với những mái nhà đơn sơ, những con suối nhỏ chảy qua.\n• Tham quan đỉnh Fansipan – nóc nhà Đông Dương, ngắm toàn cảnh Sapa từ trên cao.\n• Tham quan thác Bạc, cầu Mây, tự do mua sắm tại chợ đêm Sapa.\nTOUR BAO GỒM\n• Xe đưa đón.\n• Khách sạn 3 sao.\n• Hướng dẫn viên.\n• Bữa ăn theo chương trình.\nKHÔNG BAO GỒM\n• Chi phí cá nhân.\n• Vé máy bay.\n• Phụ thu phòng đơn.'
        },
      },
      {
        id: '2',
        title: 'Hà Nội - Hạ Long 4 Ngày 3 Đêm',
        image: require('../img/image 2.png'),
        duration: '4 ngày 3 đêm',
        frequency: 'Hàng Tuần',
        transport: 'Ô tô/Máy bay',
        hotel:'Khách sạn 2-3 sao',
        price: '5.200.000',
        detailedInfo: {
          description: 'Khám phá vịnh Hạ Long - di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi và hang động kỳ bí.',
          itinerary: [
            'Ngày 1: Khởi hành từ Hà Nội, đến Hạ Long, nhận phòng khách sạn.',
            'Ngày 2: Du thuyền tham quan vịnh Hạ Long, hang Sửng Sốt.',
            'Ngày 3: Tham quan đảo Titop, chèo thuyền kayak.',
            'Ngày 4: Trở về Hà Nội, kết thúc hành trình.',
          ],
          inclusions: ['Du thuyền', 'Khách sạn 3 sao', 'Hướng dẫn viên', 'Bữa ăn theo chương trình'],
          exclusions: ['Chi phí cá nhân', 'Đồ uống', 'Phụ thu phòng đơn'],
        },
      },
      {
        id: '3',
        title: 'Hà Nội - Ninh Bình 3 Ngày 2 Đêm',
        image: require('../img/image 2.png'),
        duration: '3 ngày 2 đêm',
        frequency: 'Hàng Tuần',
        transport: 'Ô tô/Máy bay',
        hotel:'Khách sạn 2-3 sao',
        price: '3.800.000',
        detailedInfo: {
          description: 'Hành trình khám phá Ninh Bình với cảnh quan núi non hùng vĩ và những di tích lịch sử nổi tiếng.',
          itinerary: [
            'Ngày 1: Khởi hành từ Hà Nội, tham quan chùa Bái Đính.',
            'Ngày 2: Tham quan Tràng An, Tam Cốc - Bích Động.',
            'Ngày 3: Thăm cố đô Hoa Lư, trở về Hà Nội.',
          ],
          inclusions: ['Xe đưa đón', 'Khách sạn 3 sao', 'Hướng dẫn viên', 'Bữa ăn theo chương trình'],
          exclusions: ['Chi phí cá nhân', 'Vé tham quan ngoài chương trình'],
        },
      },
    ],
    discountedTrips: [
      {
        id: '4',
        title: 'Khám Phá Xứ Sở Kim Chi - Seoul, Đảo Nami - Everland',
        image: require('../img/image 3.png'),
        duration: '3 ngày 2 đêm',
        frequency: 'Hàng Tuần',
        transport: 'Ô tô/Máy bay',
        hotel:'Khách sạn 2-3 sao',
        originalPrice: '14.900.000',
        price: '13.900.000',
        detailedInfo: {
          description: 'Chuyến đi đến Hàn Quốc, khám phá thủ đô Seoul, đảo Nami thơ mộng và công viên Everland đầy thú vị.',
          itinerary: [
            'Ngày 1: Bay từ Việt Nam đến Seoul, nhận phòng khách sạn.',
            'Ngày 2: Tham quan đảo Nami, cung Gyeongbokgung.',
            'Ngày 3: Vui chơi tại công viên Everland, mua sắm tại Myeongdong.',
            'Ngày 4: Tự do khám phá Seoul, bay về Việt Nam.',
          ],
          inclusions: ['Vé máy bay khứ hồi', 'Khách sạn 4 sao', 'Hướng dẫn viên', 'Bữa ăn theo chương trình'],
          exclusions: ['Chi phí cá nhân', 'Phí visa Hàn Quốc'],
        },
      },
      {
        id: '5',
        title: 'Thái Lan - Bangkok, Pattaya 5 Ngày 4 Đêm',
        image: require('../img/image 3.png'),
        duration: '3 ngày 2 đêm',
        frequency: 'Hàng Tuần',
        transport: 'Ô tô/Máy bay',
        hotel:'Khách sạn 2-3 sao',
        originalPrice: '9.500.000',
        price: '8.900.000',
        detailedInfo: {
          description: 'Hành trình khám phá xứ sở chùa Vàng, từ thủ đô Bangkok sôi động đến Pattaya với bãi biển tuyệt đẹp.',
          itinerary: [
            'Ngày 1: Bay từ Việt Nam đến Bangkok, tham quan chùa Wat Arun.',
            'Ngày 2: Tham quan cung điện Hoàng gia, chợ nổi Damnoen Saduak.',
            'Ngày 3: Đi Pattaya, tham quan đảo Coral, xem show Alcazar.',
            'Ngày 4: Tự do mua sắm tại Pattaya, trở về Bangkok.',
            'Ngày 5: Bay về Việt Nam, kết thúc hành trình.',
          ],
          inclusions: ['Vé máy bay khứ hồi', 'Khách sạn 4 sao', 'Hướng dẫn viên', 'Bữa ăn theo chương trình'],
          exclusions: ['Chi phí cá nhân', 'Phí tham quan ngoài chương trình'],
        },
      },
    ],
  };
  
  export default tourData;