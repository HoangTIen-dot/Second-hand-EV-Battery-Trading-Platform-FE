import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Row,
  Col,
  Image,
  Button,
  Tag,
  Rate,
  Divider,
  Descriptions,
  Avatar,
  Space,
  InputNumber,
  Tabs,
  List,
  Typography,
  Progress,
  Form,
  Input,
  message,
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MessageOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import styles from './ProductDetailModal.module.css';

const { Title, Text, Paragraph } = Typography;

const ProductDetailModal = ({ visible, product, onClose, onAddToCart }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm] = Form.useForm();

  if (!product) return null;

  const {
    id,
    name,
    brand,
    category,
    price,
    originalPrice,
    image,
    capacity,
    voltage,
    condition,
    warranty,
    rating,
    reviews,
    seller,
    batteryHealth,
    usageYears,
    location,
    postedDate,
    membershipLevel,
    tag,
    inStock = true,
  } = product;

  // Mock additional images
  const images = [
    image,
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800',
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    'https://images.unsplash.com/photo-1612538498613-76d10ae4b5aef?w=800',
  ];

  const getMembershipColor = (level) => {
    switch (level) {
      case 4:
        return { color: '#667eea', icon: '💎', label: 'Kim cương' };
      case 3:
        return { color: '#f093fb', icon: '🥇', label: 'Vàng' };
      case 2:
        return { color: '#4facfe', icon: '🥈', label: 'Bạc' };
      case 1:
        return { color: '#fa709a', icon: '🥉', label: 'Đồng' };
      default:
        return { color: '#888', icon: '', label: '' };
    }
  };

  const membershipInfo = getMembershipColor(membershipLevel);

  // Kiểm tra xem có phải xe máy hoặc ô tô không
  const isVehicle = category === 'motorcycle' || category === 'car';

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    if (isVehicle) {
      setShowContactForm(true);
    } else {
      onClose();
      navigate('/payment', { state: { product, quantity } });
    }
  };

  const handleSubmitContactForm = (values) => {
    console.log('Contact form values:', values);
    message.success('Thông tin của bạn đã được gửi! Nhân viên sẽ liên hệ lại trong thời gian sớm nhất.');
    contactForm.resetFields();
    setShowContactForm(false);
    onClose();
  };

  const handleContactSeller = () => {
    Modal.info({
      title: 'Liên hệ người bán',
      content: `Số điện thoại: 0${Math.floor(Math.random() * 900000000 + 100000000)}`,
    });
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1200}
      className={styles.productModal}
      centered
    >
      <Row gutter={[32, 32]}>
        {/* Left Side - Images */}
        <Col xs={24} md={12}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <Image
                src={images[selectedImage]}
                alt={name}
                width="100%"
                height={400}
                style={{ objectFit: 'cover', borderRadius: '12px' }}
              />
              {membershipLevel && (
                <div
                  className={styles.membershipBadge}
                  style={{ background: membershipInfo.color }}
                >
                  {membershipInfo.icon} {tag}
                </div>
              )}
            </div>
            <div className={styles.thumbnails}>
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.activeThumbnail : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Right Side - Details */}
        <Col xs={24} md={12}>
          <div className={styles.detailSection}>
            {/* Seller Info */}
            <div className={styles.sellerCard}>
              <Avatar size={48} icon={<UserOutlined />} src={seller?.avatar} />
              <div className={styles.sellerInfo}>
                <Text strong style={{ fontSize: '16px' }}>
                  {seller?.name || 'Người bán'}
                </Text>
                <div className={styles.sellerMeta}>
                  <Rate disabled defaultValue={seller?.rating || 4.5} style={{ fontSize: 12 }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    ({seller?.totalSales || 0} giao dịch)
                  </Text>
                </div>
                <div className={styles.sellerLocation}>
                  <EnvironmentOutlined />
                  <Text type="secondary">{location}</Text>
                </div>
              </div>
              <Space direction="vertical" size="small">
                <Button
                  icon={<PhoneOutlined />}
                  size="small"
                  type="primary"
                  onClick={handleContactSeller}
                >
                  Gọi
                </Button>
                <Button icon={<MessageOutlined />} size="small">
                  Chat
                </Button>
              </Space>
            </div>

            <Divider />

            {/* Product Title */}
            <div className={styles.titleSection}>
              <Tag color="blue">{brand}</Tag>
              <Title level={3} style={{ margin: '8px 0' }}>
                {name}
              </Title>
              <Space>
                <Rate disabled defaultValue={rating} allowHalf style={{ fontSize: 16 }} />
                <Text type="secondary">({reviews} đánh giá)</Text>
                <Divider type="vertical" />
                <ClockCircleOutlined />
                <Text type="secondary">{postedDate}</Text>
              </Space>
            </div>

            <Divider />

            {/* Price */}
            <div className={styles.priceSection}>
              <div className={styles.currentPrice}>
                {price?.toLocaleString('vi-VN')}₫
              </div>
              {originalPrice && originalPrice > price && (
                <div className={styles.priceRow}>
                  <Text delete type="secondary" style={{ fontSize: 16 }}>
                    {originalPrice?.toLocaleString('vi-VN')}₫
                  </Text>
                  <Tag color="red" style={{ marginLeft: 8 }}>
                    Giảm {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                  </Tag>
                </div>
              )}
            </div>

            <Divider />

            {/* Battery Health */}
            <div className={styles.healthSection}>
              <div className={styles.healthHeader}>
                <SafetyOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                <Text strong style={{ fontSize: 16 }}>
                  Tình trạng pin
                </Text>
              </div>
              <div className={styles.healthBar}>
                <Text>Độ khỏe pin:</Text>
                <Progress
                  percent={batteryHealth || 90}
                  strokeColor={{
                    '0%': '#52c41a',
                    '100%': '#73d13d',
                  }}
                  style={{ flex: 1, margin: '0 12px' }}
                />
                <Text strong>{batteryHealth || 90}%</Text>
              </div>
              <Tag
                color={
                  condition === 'Như mới'
                    ? 'green'
                    : condition === 'Tốt'
                    ? 'blue'
                    : 'orange'
                }
                style={{ marginTop: 8 }}
              >
                {condition}
              </Tag>
            </div>

            <Divider />

            {/* Specifications */}
            <Descriptions column={2} size="small" bordered>
              <Descriptions.Item
                label={
                  <>
                    <ThunderboltOutlined /> Dung lượng
                  </>
                }
              >
                <Text strong>{capacity} kWh</Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <SafetyOutlined /> Điện áp
                  </>
                }
              >
                <Text strong>{voltage}V</Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <CalendarOutlined /> Thời gian sử dụng
                  </>
                }
              >
                <Text strong>{usageYears || warranty} năm</Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <>
                    <CheckCircleOutlined /> Bảo hành
                  </>
                }
              >
                <Text strong>{warranty} tháng</Text>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Quantity & Actions */}
            <div className={styles.actionSection}>
              {!isVehicle && (
                <div className={styles.quantitySection}>
                  <Text strong>Số lượng:</Text>
                  <InputNumber
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={setQuantity}
                    style={{ width: 100, margin: '0 12px' }}
                  />
                  <Text type="secondary">(Còn {Math.floor(Math.random() * 10 + 1)} sản phẩm)</Text>
                </div>
              )}

              {showContactForm && isVehicle ? (
                <div style={{ marginTop: 16, padding: 20, background: '#f5f5f5', borderRadius: 8 }}>
                  <Title level={5} style={{ marginBottom: 8 }}>
                    <UserOutlined style={{ marginRight: 8 }} />
                    Để lại thông tin liên hệ
                  </Title>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                    Vui lòng điền thông tin để nhân viên tư vấn liên hệ lại với bạn về sản phẩm này
                  </Text>
                  <Form
                    form={contactForm}
                    layout="vertical"
                    onFinish={handleSubmitContactForm}
                  >
                    <Form.Item
                      name="fullName"
                      label="Họ và tên"
                      rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                    >
                      <Input placeholder="Nguyễn Văn A" size="large" />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ (10 số)' }
                      ]}
                    >
                      <Input placeholder="0901234567" size="large" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' }
                      ]}
                    >
                      <Input placeholder="example@email.com" size="large" />
                    </Form.Item>
                    <Form.Item
                      name="note"
                      label="Ghi chú (không bắt buộc)"
                    >
                      <Input.TextArea 
                        placeholder="Thời gian thuận tiện để liên hệ, câu hỏi cần tư vấn..." 
                        rows={3}
                        size="large"
                      />
                    </Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                      <Button onClick={() => setShowContactForm(false)} size="large">
                        Hủy
                      </Button>
                      <Button type="primary" htmlType="submit" size="large" icon={<UserOutlined />}>
                        Gửi thông tin
                      </Button>
                    </Space>
                  </Form>
                </div>
              ) : (
                <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 16 }}>
                  <Space style={{ width: '100%', gap: 12 }}>
                    {!isVehicle && (
                      <Button
                        type="default"
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        style={{ 
                          flex: 1,
                          height: 50, 
                          fontSize: 16, 
                          fontWeight: 600,
                          borderColor: '#1890ff',
                          color: '#1890ff'
                        }}
                      >
                        Thêm giỏ hàng
                      </Button>
                    )}
                    <Button
                      type="primary"
                      size="large"
                      icon={isVehicle ? <UserOutlined /> : <CreditCardOutlined />}
                      onClick={handleBuyNow}
                      disabled={!inStock}
                      style={{ 
                        flex: 1,
                        height: 50, 
                        fontSize: 16, 
                        fontWeight: 600,
                        background: isVehicle 
                          ? 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)' 
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      }}
                    >
                      {isVehicle ? 'Để lại thông tin' : 'Mua ngay'}
                    </Button>
                  </Space>
                  <Space style={{ width: '100%', justifyContent: 'center' }}>
                    <Button icon={<HeartOutlined />} size="large">
                      Yêu thích
                    </Button>
                    <Button icon={<ShareAltOutlined />} size="large">
                      Chia sẻ
                    </Button>
                  </Space>
                </Space>
              )}
            </div>

            {/* Additional Info */}
            <div className={styles.infoBox}>
              <Space direction="vertical" size="small">
                <div className={styles.infoItem}>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  <Text>Đã kiểm tra chất lượng</Text>
                </div>
                <div className={styles.infoItem}>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  <Text>Giao hàng miễn phí</Text>
                </div>
                <div className={styles.infoItem}>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  <Text>Hỗ trợ lắp đặt</Text>
                </div>
              </Space>
            </div>
          </div>
        </Col>
      </Row>

      {/* Additional Tabs */}
      <Divider />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Mô tả chi tiết" key="1">
          <Paragraph>
            Pin {brand} {name} là sản phẩm chất lượng cao, đã qua sử dụng {usageYears || 2} năm
            nhưng vẫn giữ được {batteryHealth || 90}% dung lượng ban đầu. Pin được kiểm tra kỹ
            lưỡng, đảm bảo an toàn và hiệu suất ổn định.
          </Paragraph>
          <List
            header={<Text strong>Ưu điểm:</Text>}
            dataSource={[
              'Dung lượng cao, phù hợp nhiều ứng dụng',
              'Độ bền cao, tuổi thọ lâu dài',
              'Đã qua kiểm tra an toàn nghiêm ngặt',
              'Bảo hành chính hãng',
              'Hỗ trợ lắp đặt miễn phí',
            ]}
            renderItem={(item) => (
              <List.Item>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                {item}
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Chính sách" key="2">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Chính sách đổi trả:</Text>
              <Paragraph>
                - Đổi trả trong vòng 7 ngày nếu sản phẩm lỗi
                <br />- Hoàn tiền 100% nếu không đúng mô tả
              </Paragraph>
            </div>
            <div>
              <Text strong>Chính sách bảo hành:</Text>
              <Paragraph>
                - Bảo hành {warranty} tháng
                <br />- Hỗ trợ kỹ thuật 24/7
              </Paragraph>
            </div>
            <div>
              <Text strong>Chính sách vận chuyển:</Text>
              <Paragraph>
                - Giao hàng toàn quốc
                <br />- Miễn phí vận chuyển
                <br />- Thời gian: 3-5 ngày làm việc
              </Paragraph>
            </div>
          </Space>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default ProductDetailModal;
