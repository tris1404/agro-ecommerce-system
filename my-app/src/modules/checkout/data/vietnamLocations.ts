export interface Province {
  id: string;
  name: string;
  districts: {
    id: string;
    name: string;
    wards: string[];
  }[];
}

export const VIETNAM_PROVINCES: Province[] = [
  {
    id: 'tien-giang',
    name: 'Tiền Giang (ĐBSCL)',
    districts: [
      { id: 'cai-be', name: 'Huyện Cái Bè', wards: ['Thị trấn Cái Bè', 'Xã Đông Hòa Hiệp', 'Xã Hậu Mỹ Bắc', 'Xã Mỹ Lương', 'Xã An Hữu'] },
      { id: 'cai-lay', name: 'Thị xã Cai Lậy', wards: ['Phường 1', 'Xã Long Khánh', 'Xã Thanh Hòa', 'Xã Mỹ Hạnh Đông'] },
      { id: 'cho-gao', name: 'Huyện Chợ Gạo', wards: ['Thị trấn Chợ Gạo', 'Xã An Thạnh Thủy', 'Xã Bình Phục Nhứt'] },
    ]
  },
  {
    id: 'an-giang',
    name: 'An Giang (Vựa Lúa)',
    districts: [
      { id: 'thoai-son', name: 'Huyện Thoại Sơn', wards: ['Thị trấn Núi Sập', 'Xã Vọng Thê', 'Xã Thoại Giang', 'Xã Định Mỹ'] },
      { id: 'tri-ton', name: 'Huyện Tri Tôn', wards: ['Thị trấn Tri Tôn', 'Xã Ba Chúc', 'Xã Lương Phi', 'Xã Cô Tô'] },
      { id: 'chau-thanh-ag', name: 'Huyện Châu Thành', wards: ['Thị trấn An Châu', 'Xã Bình Thạnh', 'Xã Cần Đăng'] },
    ]
  },
  {
    id: 'dong-thap',
    name: 'Đồng Tháp (Sen Hồng & Lúa)',
    districts: [
      { id: 'thap-muoi', name: 'Huyện Tháp Mười', wards: ['Thị trấn Mỹ An', 'Xã Đốc Binh Kiều', 'Xã Mỹ Đông'] },
      { id: 'lap-vo', name: 'Huyện Lấp Vò', wards: ['Thị trấn Lấp Vò', 'Xã Bình Thành', 'Xã Định An'] },
      { id: 'cao-lanh', name: 'Huyện Cao Lãnh', wards: ['Thị trấn Mỹ Thọ', 'Xã Ba Sao', 'Xã Bình Hàng Trung'] },
    ]
  },
  {
    id: 'dak-lak',
    name: 'Đắk Lắk (Cà phê & Sầu riêng)',
    districts: [
      { id: 'krong-pak', name: 'Huyện Krông Pắk', wards: ['Thị trấn Phước An', 'Xã Ea Yông', 'Xã Ea Kly', 'Xã Vụ Bổn'] },
      { id: 'cu-mgar', name: 'Huyện Cư M\'gar', wards: ['Thị trấn Quảng Phú', 'Xã Ea Pốk', 'Xã Cuôr Đăng'] },
      { id: 'bmt', name: 'Thành phố Buôn Ma Thuột', wards: ['Phường Tân Lập', 'Phường Thắng Lợi', 'Xã Hòa Phú'] },
    ]
  },
  {
    id: 'hcm',
    name: 'Thành phố Hồ Chí Minh',
    districts: [
      { id: 'cu-chi', name: 'Huyện Củ Chi', wards: ['Thị trấn Củ Chi', 'Xã An Nhơn Tây', 'Xã Tân Thạnh Đông'] },
      { id: 'binh-chanh', name: 'Huyện Bình Chánh', wards: ['Thị trấn Tân Túc', 'Xã Vĩnh Lộc A', 'Xã Bình Hưng'] },
      { id: 'thu-duc', name: 'Thành phố Thủ Đức', wards: ['Phường Linh Trung', 'Phường Hiệp Bình Chánh', 'Phường Tăng Nhơn Phú'] },
    ]
  },
  {
    id: 'ha-noi',
    name: 'Hà Nội',
    districts: [
      { id: 'me-linh', name: 'Huyện Mê Linh', wards: ['Thị trấn Quang Minh', 'Xã Tiền Phong', 'Xã Mê Linh'] },
      { id: 'soc-son', name: 'Huyện Sóc Sơn', wards: ['Thị trấn Sóc Sơn', 'Xã Phù Lỗ', 'Xã Nam Sơn'] },
      { id: 'dong-anh', name: 'Huyện Đông Anh', wards: ['Thị trấn Đông Anh', 'Xã Hải Bối', 'Xã Vĩnh Ngọc'] },
    ]
  }
];
