import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Table, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Upload, 
  message,
  Row,
  Col,
  Statistic,
  Avatar,
  Tabs,
  Badge,
  Tooltip,
  Popconfirm,
  Typography
} from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  DollarOutlined,
  ShoppingOutlined,
  RiseOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { Header, Footer } from '../../components/layout';
import styles from './CustomerPage.module.css';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const CustomerPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [products, setProducts] = useState([
    {
      key: '1',
      id: 1,
      name: 'Pin Tesla Model 3 - 75kWh',
      category: 'battery',
      brand: 'Tesla',
      capacity: 75,
      voltage: 350,
      price: 204000000,
      status: 'active',
      views: 156,
      likes: 23,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
      createdAt: '2024-10-20',
      condition: 'Như mới',
      warranty: 2
    },
    {
      key: '2',
      id: 2,
      name: 'Xe Máy Điện VinFast Klara S',
      category: 'motorcycle',
      brand: 'VinFast',
      capacity: 2.4,
      voltage: 60,
      price: 18000000,
      status: 'pending',
      views: 89,
      likes: 12,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      createdAt: '2024-10-21',
      condition: 'Như mới',
      warranty: 2
    },
    {
      key: '3',
      id: 3,
      name: 'Xe Ô Tô Điện VinFast VF e34',
      category: 'car',
      brand: 'VinFast',
      capacity: 42,
      voltage: 350,
      price: 485000000,
      status: 'sold',
      views: 234,
      likes: 45,
      image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400',
      createdAt: '2024-10-18',
      condition: 'Như mới',
      warranty: 3
    }
  ]);

  // Statistics
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    soldProducts: products.filter(p => p.status === 'sold').length,
    totalRevenue: products.filter(p => p.status === 'sold').reduce((sum, p) => sum + p.price, 0),
    totalViews: products.reduce((sum, p) => sum + p.views, 0)
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    const newProduct = {
      key: String(products.length + 1),
      id: products.length + 1,
      ...values,
      status: 'pending',
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, newProduct]);
    message.success('Sản phẩm đã được đăng thành công! Đang chờ duyệt.');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (record) => {
    setProducts(products.filter(p => p.key !== record.key));
    message.success('Đã xóa sản phẩm thành công!');
  };

  const getCategoryTag = (category) => {
    const categoryMap = {
      battery: { color: 'purple', icon: '🔋', text: 'Pin' },
      motorcycle: { color: 'orange', icon: '🏍️', text: 'Xe máy' },
      car: { color: 'blue', icon: '🚗', text: 'Ô tô' }
    };
    const cat = categoryMap[category] || categoryMap.battery;
    return <Tag color={cat.color} icon={cat.icon}>{cat.text}</Tag>;
  };

  const getStatusTag = (status) => {
    const statusMap = {
      active: { color: 'success', icon: <CheckCircleOutlined />, text: 'Đang bán' },
      pending: { color: 'warning', icon: <ClockCircleOutlined />, text: 'Chờ duyệt' },
      sold: { color: 'default', icon: <CheckCircleOutlined />, text: 'Đã bán' },
      rejected: { color: 'error', icon: <CloseCircleOutlined />, text: 'Từ chối' }
    };
    const s = statusMap[status] || statusMap.pending;
    return <Tag color={s.color} icon={s.icon}>{s.text}</Tag>;
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text, record) => (
        <Space>
          <Avatar src={record.image} size={64} shape="square" />
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{text}</div>
            <Space size="small">
              {getCategoryTag(record.category)}
              <Tag>{record.brand}</Tag>
            </Space>
          </div>
        </Space>
      )
    },
    {
      title: 'Thông số',
      key: 'specs',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <span>⚡ {record.capacity} kWh</span>
          <span>🔌 {record.voltage}V</span>
          <span>✨ {record.condition}</span>
        </Space>
      )
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <div style={{ fontWeight: 600, color: '#1890ff', fontSize: 16 }}>
          {price.toLocaleString('vi-VN')}₫
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status)
    },
    {
      title: 'Thống kê',
      key: 'stats',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <span>👁️ {record.views} lượt xem</span>
          <span>❤️ {record.likes} yêu thích</span>
        </Space>
      )
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Sửa">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc muốn xóa sản phẩm này?"
              onConfirm={() => handleDelete(record)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div className={styles.customerPage}>
      <Header />
      
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>
              <TrophyOutlined style={{ marginRight: 12, color: '#faad14' }} />
              Quản lý sản phẩm của tôi
            </h1>
            <p className={styles.pageSubtitle}>Quản lý và theo dõi các sản phẩm bạn đang bán</p>
          </div>
          <Button 
            type="primary" 
            size="large" 
            icon={<PlusOutlined />}
            onClick={showModal}
            style={{ 
              height: 48,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Đăng tin mới
          </Button>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard} style={{ borderTop: '4px solid #1890ff' }}>
              <Statistic
                title="Tổng sản phẩm"
                value={stats.totalProducts}
                prefix={<ShoppingOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontWeight: 700 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard} style={{ borderTop: '4px solid #52c41a' }}>
              <Statistic
                title="Đang bán"
                value={stats.activeProducts}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a', fontWeight: 700 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard} style={{ borderTop: '4px solid #faad14' }}>
              <Statistic
                title="Đã bán"
                value={stats.soldProducts}
                prefix={<TrophyOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#faad14', fontWeight: 700 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className={styles.statCard} style={{ borderTop: '4px solid #722ed1' }}>
              <Statistic
                title="Tổng lượt xem"
                value={stats.totalViews}
                prefix={<EyeOutlined style={{ color: '#722ed1' }} />}
                valueStyle={{ color: '#722ed1', fontWeight: 700 }}
              />
            </Card>
          </Col>
        </Row>

        {/* Products Table */}
        <Card 
          className={styles.tableCard}
          title={
            <Space>
              <ThunderboltOutlined style={{ color: '#faad14', fontSize: 20 }} />
              <span style={{ fontSize: 18, fontWeight: 600 }}>Danh sách sản phẩm</span>
            </Space>
          }
        >
          <Table 
            columns={columns} 
            dataSource={products}
            pagination={{ 
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} sản phẩm`
            }}
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Create Product Modal */}
        <Modal
          title={
            <Space>
              <PlusOutlined style={{ color: '#1890ff' }} />
              <span>Đăng tin bán sản phẩm</span>
            </Space>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={900}
          className={styles.productModal}
          style={{ top: 20 }}
          bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ marginTop: 24 }}
          >
            <Row gutter={16}>
              {/* Package Selection */}
              <Col span={24}>
                <Card 
                  style={{ 
                    marginBottom: 24, 
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
                    border: '2px solid #1890ff'
                  }}
                >
                  <Form.Item
                    name="packageLevel"
                    label={
                      <Space>
                        <TrophyOutlined style={{ color: '#faad14', fontSize: 18 }} />
                        <span style={{ fontSize: 16, fontWeight: 600 }}>Chọn gói đăng tin</span>
                      </Space>
                    }
                    rules={[{ required: true, message: 'Vui lòng chọn gói đăng tin' }]}
                  >
                    <Select size="large" placeholder="Chọn gói đăng tin phù hợp">
                      <Option value={1}>
                        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                          <span>🥉 <strong>Đồng</strong> - Hiển thị 3 ngày</span>
                          <Tag color="#fa709a">0₫</Tag>
                        </Space>
                      </Option>
                      <Option value={2}>
                        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                          <span>🥈 <strong>Bạc</strong> - Hiển thị 7 ngày + Nổi bật</span>
                          <Tag color="#4facfe">100,000₫</Tag>
                        </Space>
                      </Option>
                      <Option value={3}>
                        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                          <span>🥇 <strong>Vàng</strong> - Hiển thị 14 ngày + Ưu tiên + SEO</span>
                          <Tag color="#f093fb">200,000₫</Tag>
                        </Space>
                      </Option>
                      <Option value={4}>
                        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                          <span>💎 <strong>Kim Cương</strong> - Hiển thị 30 ngày + VIP</span>
                          <Tag color="#667eea">350,000₫</Tag>
                        </Space>
                      </Option>
                    </Select>
                  </Form.Item>
                  
                  <div style={{ marginTop: 12, padding: '12px 16px', background: 'white', borderRadius: 8 }}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        💡 <strong>Lợi ích khi nâng cấp gói:</strong>
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        • Gói cao hơn = Hiển thị lâu hơn + Vị trí ưu tiên
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        • Tin Vàng & Kim Cương xuất hiện trang chủ và top tìm kiếm
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        • Tối ưu SEO giúp tìm kiếm Google dễ dàng hơn
                      </Text>
                    </Space>
                  </div>
                </Card>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="category"
                  label="Loại sản phẩm"
                  rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
                >
                  <Select size="large" placeholder="Chọn loại sản phẩm">
                    <Option value="battery">🔋 Pin điện</Option>
                    <Option value="motorcycle">🏍️ Xe máy điện</Option>
                    <Option value="car">🚗 Ô tô điện</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                >
                  <Input size="large" placeholder="VD: Pin Tesla Model 3 - 75kWh" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="brand"
                  label="Thương hiệu"
                  rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
                >
                  <Select size="large" placeholder="Chọn thương hiệu">
                    <Option value="Tesla">Tesla</Option>
                    <Option value="VinFast">VinFast</Option>
                    <Option value="Nissan">Nissan</Option>
                    <Option value="BMW">BMW</Option>
                    <Option value="Hyundai">Hyundai</Option>
                    <Option value="Kia">Kia</Option>
                    <Option value="BYD">BYD</Option>
                    <Option value="MG">MG</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="condition"
                  label="Tình trạng"
                  rules={[{ required: true, message: 'Vui lòng chọn tình trạng' }]}
                >
                  <Select size="large" placeholder="Chọn tình trạng">
                    <Option value="Như mới">✨ Như mới</Option>
                    <Option value="Rất tốt">⭐ Rất tốt</Option>
                    <Option value="Tốt">👍 Tốt</Option>
                    <Option value="Khá">👌 Khá</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="capacity"
                  label="Dung lượng (kWh)"
                  rules={[{ required: true, message: 'Vui lòng nhập dung lượng' }]}
                >
                  <InputNumber size="large" min={0} style={{ width: '100%' }} placeholder="75" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="voltage"
                  label="Điện áp (V)"
                  rules={[{ required: true, message: 'Vui lòng nhập điện áp' }]}
                >
                  <InputNumber size="large" min={0} style={{ width: '100%' }} placeholder="350" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="warranty"
                  label="Bảo hành (năm)"
                  rules={[{ required: true, message: 'Vui lòng nhập bảo hành' }]}
                >
                  <InputNumber size="large" min={0} max={10} style={{ width: '100%' }} placeholder="2" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="price"
                  label="Giá bán (VNĐ)"
                  rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}
                >
                  <InputNumber
                    size="large"
                    min={0}
                    style={{ width: '100%' }}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    placeholder="204,000,000"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Mô tả chi tiết sản phẩm"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mô tả chi tiết' },
                    { min: 50, message: 'Mô tả phải có ít nhất 50 ký tự' },
                    { max: 1000, message: 'Mô tả không được vượt quá 1000 ký tự' }
                  ]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Mô tả chi tiết về sản phẩm: tình trạng, lịch sử sử dụng, xuất xứ, đặc điểm nổi bật..."
                    size="large"
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="advantages"
                  label="Ưu điểm sản phẩm"
                  rules={[
                    { required: true, message: 'Vui lòng nhập ưu điểm sản phẩm' },
                    { max: 500, message: 'Ưu điểm không được vượt quá 500 ký tự' }
                  ]}
                  tooltip="Liệt kê các ưu điểm, điểm mạnh của sản phẩm"
                >
                  <TextArea 
                    rows={3} 
                    placeholder="VD: Dung lượng cao, độ bền tốt, tiết kiệm điện năng, thời gian sạc nhanh..."
                    size="large"
                    showCount
                    maxLength={500}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="warrantyPolicy"
                  label="Chính sách bảo hành"
                  rules={[{ required: true, message: 'Vui lòng chọn chính sách bảo hành' }]}
                >
                  <Select size="large" placeholder="Chọn chính sách bảo hành">
                    <Option value="1year">Bảo hành 1 năm</Option>
                    <Option value="2years">Bảo hành 2 năm</Option>
                    <Option value="3years">Bảo hành 3 năm</Option>
                    <Option value="5years">Bảo hành 5 năm</Option>
                    <Option value="lifetime">Bảo hành trọn đời</Option>
                    <Option value="none">Không bảo hành</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="returnPolicy"
                  label="Chính sách đổi trả"
                  rules={[{ required: true, message: 'Vui lòng chọn chính sách đổi trả' }]}
                >
                  <Select size="large" placeholder="Chọn chính sách đổi trả">
                    <Option value="7days">Đổi trả trong 7 ngày</Option>
                    <Option value="15days">Đổi trả trong 15 ngày</Option>
                    <Option value="30days">Đổi trả trong 30 ngày</Option>
                    <Option value="conditional">Đổi trả có điều kiện</Option>
                    <Option value="none">Không hỗ trợ đổi trả</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="shippingPolicy"
                  label="Chính sách vận chuyển"
                  rules={[{ required: true, message: 'Vui lòng chọn chính sách vận chuyển' }]}
                >
                  <Select size="large" placeholder="Chọn chính sách vận chuyển">
                    <Option value="free">Miễn phí vận chuyển</Option>
                    <Option value="freeover">Miễn phí đơn trên 5 triệu</Option>
                    <Option value="buyer">Người mua chịu phí</Option>
                    <Option value="negotiate">Thỏa thuận</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="installationSupport"
                  label="Hỗ trợ lắp đặt"
                  rules={[{ required: true, message: 'Vui lòng chọn hỗ trợ lắp đặt' }]}
                >
                  <Select size="large" placeholder="Chọn hỗ trợ lắp đặt">
                    <Option value="free">Lắp đặt miễn phí</Option>
                    <Option value="paid">Lắp đặt có phí</Option>
                    <Option value="guide">Hướng dẫn lắp đặt</Option>
                    <Option value="none">Không hỗ trợ</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="additionalNotes"
                  label="Ghi chú thêm (không bắt buộc)"
                  tooltip="Thông tin bổ sung về giao dịch, điều kiện mua bán..."
                >
                  <TextArea 
                    rows={2} 
                    placeholder="VD: Chỉ giao trong nội thành, cần đặt cọc trước, liên hệ trước khi đến xem hàng..."
                    size="large"
                    showCount
                    maxLength={300}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="image"
                  label="Hình ảnh sản phẩm"
                  tooltip="Tải lên tối đa 5 hình ảnh sản phẩm"
                >
                  <Upload
                    listType="picture-card"
                    maxCount={5}
                    beforeUpload={() => false}
                  >
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Tải ảnh</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button size="large" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button 
                  type="primary" 
                  size="large" 
                  htmlType="submit"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                >
                  Đăng tin
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerPage;
