import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Steps,
  Form,
  Input,
  Button,
  Radio,
  Divider,
  Space,
  Typography,
  Avatar,
  Tag,
  InputNumber,
  message,
  Checkbox,
  Alert,
  List
} from 'antd';
import {
  ShoppingCartOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  SafetyOutlined,
  BankOutlined,
  WalletOutlined,
  QrcodeOutlined,
  ThunderboltOutlined,
  TagOutlined,
  GiftOutlined
} from '@ant-design/icons';
import { Header, Footer } from '../../components/layout';
import { useCart } from '../../contexts/CartContext';
import styles from './PaymentPage.module.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { product, quantity = 1, cartItems, isCartCheckout } = location.state || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState('vnpay');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Redirect if no product and not cart checkout
  if (!product && !isCartCheckout) {
    message.warning('Vui lòng chọn sản phẩm để thanh toán');
    navigate('/products');
    return null;
  }

  // Calculate totals
  const shippingFee = 0; // Miễn phí vận chuyển
  const discount = 0;
  
  let subtotal = 0;
  let itemsToDisplay = [];
  
  if (isCartCheckout && cartItems) {
    // Checkout from cart
    subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    itemsToDisplay = cartItems;
  } else if (product) {
    // Direct buy now
    subtotal = product.price * quantity;
    itemsToDisplay = [{ ...product, quantity }];
  }
  
  const total = subtotal + shippingFee - discount;

  const paymentMethods = [
    {
      id: 'vnpay',
      name: 'VNPay',
      icon: <WalletOutlined />,
      description: 'Thanh toán qua VNPay QR',
      color: '#0088cc'
    },
    {
      id: 'momo',
      name: 'MoMo',
      icon: <WalletOutlined />,
      description: 'Ví điện tử MoMo',
      color: '#d82d8b'
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      icon: <WalletOutlined />,
      description: 'Ví điện tử ZaloPay',
      color: '#0068ff'
    },
    {
      id: 'bank',
      name: 'Chuyển khoản',
      icon: <BankOutlined />,
      description: 'Chuyển khoản ngân hàng',
      color: '#52c41a'
    },
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng',
      icon: <HomeOutlined />,
      description: 'COD - Tiền mặt',
      color: '#faad14'
    }
  ];

  const steps = [
    {
      title: 'Thông tin',
      icon: <UserOutlined />
    },
    {
      title: 'Thanh toán',
      icon: <CreditCardOutlined />
    },
    {
      title: 'Hoàn tất',
      icon: <CheckCircleOutlined />
    }
  ];

  const handleSubmitInfo = (values) => {
    console.log('Customer info:', values);
    setCurrentStep(1);
  };

  const handlePayment = () => {
    if (!agreeTerms) {
      message.warning('Vui lòng đồng ý với điều khoản và điều kiện');
      return;
    }

    // Simulate payment processing
    setCurrentStep(2);
    message.success('Đặt hàng thành công!');
    
    // Clear cart if checkout from cart
    if (isCartCheckout) {
      clearCart();
    }
    
    setTimeout(() => {
      navigate('/customer');
    }, 3000);
  };

  return (
    <div className={styles.paymentPage}>
      <Header />

      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <Title level={2} className={styles.pageTitle}>
            <ShoppingCartOutlined style={{ marginRight: 12 }} />
            Thanh toán đơn hàng
          </Title>
          <Text type="secondary">Hoàn tất đơn hàng của bạn</Text>
        </div>

        {/* Steps */}
        <Card className={styles.stepsCard}>
          <Steps current={currentStep} items={steps} />
        </Card>

        <Row gutter={[24, 24]}>
          {/* Left Column - Form */}
          <Col xs={24} lg={16}>
            {currentStep === 0 && (
              <Card 
                className={styles.formCard}
                title={
                  <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <span>Thông tin người nhận</span>
                  </Space>
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmitInfo}
                  initialValues={{
                    fullName: '',
                    phone: '',
                    email: '',
                    address: '',
                    note: ''
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                      >
                        <Input 
                          size="large" 
                          prefix={<UserOutlined />}
                          placeholder="Nguyễn Văn A" 
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                          { required: true, message: 'Vui lòng nhập số điện thoại' },
                          { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
                        ]}
                      >
                        <Input 
                          size="large"
                          prefix={<PhoneOutlined />}
                          placeholder="0901234567" 
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email' },
                          { type: 'email', message: 'Email không hợp lệ' }
                        ]}
                      >
                        <Input 
                          size="large"
                          prefix={<MailOutlined />}
                          placeholder="example@email.com" 
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="address"
                        label="Địa chỉ nhận hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                      >
                        <TextArea
                          rows={3}
                          size="large"
                          placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="note"
                        label="Ghi chú (không bắt buộc)"
                      >
                        <TextArea
                          rows={2}
                          placeholder="Ghi chú thêm về đơn hàng..."
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider />

                  <Form.Item style={{ marginBottom: 0 }}>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                      <Button size="large" onClick={() => navigate('/products')}>
                        Quay lại
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
                        Tiếp tục
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {currentStep === 1 && (
              <Card 
                className={styles.formCard}
                title={
                  <Space>
                    <CreditCardOutlined style={{ color: '#1890ff' }} />
                    <span>Phương thức thanh toán</span>
                  </Space>
                }
              >
                <Radio.Group 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Space direction="vertical" style={{ width: '100%' }} size="large">
                    {paymentMethods.map(method => (
                      <Card
                        key={method.id}
                        className={`${styles.paymentMethod} ${paymentMethod === method.id ? styles.selected : ''}`}
                        hoverable
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <Radio value={method.id}>
                          <Space size="large">
                            <div 
                              className={styles.methodIcon}
                              style={{ color: method.color }}
                            >
                              {method.icon}
                            </div>
                            <div>
                              <div className={styles.methodName}>{method.name}</div>
                              <Text type="secondary" style={{ fontSize: 13 }}>
                                {method.description}
                              </Text>
                            </div>
                          </Space>
                        </Radio>
                      </Card>
                    ))}
                  </Space>
                </Radio.Group>

                <Divider />

                <Checkbox 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                >
                  <Text>
                    Tôi đã đọc và đồng ý với{' '}
                    <a href="#" style={{ color: '#1890ff' }}>Điều khoản và điều kiện</a>
                    {' '}và{' '}
                    <a href="#" style={{ color: '#1890ff' }}>Chính sách bảo mật</a>
                  </Text>
                </Checkbox>

                <Divider />

                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Button size="large" onClick={() => setCurrentStep(0)}>
                    Quay lại
                  </Button>
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={handlePayment}
                    style={{
                      background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
                      border: 'none',
                      minWidth: 200
                    }}
                  >
                    Xác nhận thanh toán
                  </Button>
                </Space>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className={styles.successCard}>
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircleOutlined 
                    style={{ 
                      fontSize: 80, 
                      color: '#52c41a',
                      marginBottom: 24 
                    }} 
                  />
                  <Title level={2} style={{ color: '#52c41a' }}>
                    Đặt hàng thành công!
                  </Title>
                  <Paragraph style={{ fontSize: 16, marginBottom: 32 }}>
                    Cảm ơn bạn đã tin tưởng và mua hàng tại EV Battery Hub.
                    <br />
                    Đơn hàng của bạn đang được xử lý.
                  </Paragraph>

                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Alert
                      message="Thông tin đơn hàng đã được gửi đến email của bạn"
                      type="success"
                      showIcon
                    />
                    
                    <Space size="middle">
                      <Button 
                        size="large"
                        onClick={() => navigate('/products')}
                      >
                        Tiếp tục mua sắm
                      </Button>
                      <Button 
                        type="primary" 
                        size="large"
                        onClick={() => navigate('/customer')}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none'
                        }}
                      >
                        Xem đơn hàng
                      </Button>
                    </Space>
                  </Space>
                </div>
              </Card>
            )}
          </Col>

          {/* Right Column - Order Summary */}
          <Col xs={24} lg={8}>
            <Card 
              className={styles.summaryCard}
              title={
                <Space>
                  <TagOutlined style={{ color: '#1890ff' }} />
                  <span>Thông tin đơn hàng</span>
                </Space>
              }
            >
              {/* Product Info */}
              <div>
                <Text strong style={{ fontSize: 15, display: 'block', marginBottom: 12 }}>
                  Sản phẩm ({itemsToDisplay.length})
                </Text>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {itemsToDisplay.map((item, index) => (
                    <div key={index} className={styles.productInfo}>
                      <Space align="start" size="middle" style={{ width: '100%' }}>
                        <Avatar 
                          src={item.image} 
                          size={60} 
                          shape="square"
                        />
                        <div style={{ flex: 1 }}>
                          <Text strong style={{ fontSize: 14, display: 'block' }}>
                            {item.name}
                          </Text>
                          <div style={{ marginTop: 4 }}>
                            <Tag color="blue" style={{ fontSize: 11 }}>{item.brand}</Tag>
                            <Tag color="green" style={{ fontSize: 11 }}>{item.capacity} kWh</Tag>
                          </div>
                          <Space style={{ marginTop: 6, width: '100%', justifyContent: 'space-between' }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              x{item.quantity}
                            </Text>
                            <Text strong style={{ color: '#1890ff', fontSize: 14 }}>
                              {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                            </Text>
                          </Space>
                        </div>
                      </Space>
                    </div>
                  ))}
                </Space>
              </div>

              <Divider />

              {/* Pricing */}
              <div className={styles.summaryRow}>
                <Text>Tạm tính:</Text>
                <Text strong>{subtotal.toLocaleString('vi-VN')}₫</Text>
              </div>

              <div className={styles.summaryRow}>
                <Text>Phí vận chuyển:</Text>
                <Text strong style={{ color: '#52c41a' }}>
                  {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}
                </Text>
              </div>

              {discount > 0 && (
                <div className={styles.summaryRow}>
                  <Text>Giảm giá:</Text>
                  <Text strong style={{ color: '#f5222d' }}>
                    -{discount.toLocaleString('vi-VN')}₫
                  </Text>
                </div>
              )}

              <Divider />

              <div className={styles.summaryRow}>
                <Text strong style={{ fontSize: 16 }}>Tổng cộng:</Text>
                <Text strong style={{ fontSize: 20, color: '#f5222d' }}>
                  {total.toLocaleString('vi-VN')}₫
                </Text>
              </div>

              <Divider />

              {/* Benefits */}
              <div className={styles.benefits}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div className={styles.benefitItem}>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text>Miễn phí vận chuyển</Text>
                  </div>
                  <div className={styles.benefitItem}>
                    <SafetyOutlined style={{ color: '#1890ff' }} />
                    <Text>Bảo hành chính hãng</Text>
                  </div>
                  <div className={styles.benefitItem}>
                    <GiftOutlined style={{ color: '#fa8c16' }} />
                    <Text>Quà tặng hấp dẫn</Text>
                  </div>
                  <div className={styles.benefitItem}>
                    <ThunderboltOutlined style={{ color: '#722ed1' }} />
                    <Text>Hỗ trợ lắp đặt miễn phí</Text>
                  </div>
                </Space>
              </div>
            </Card>

            {/* Support Card */}
            <Card 
              className={styles.supportCard}
              style={{ marginTop: 16 }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Title level={5}>
                  <PhoneOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  Cần hỗ trợ?
                </Title>
                <Paragraph style={{ margin: 0 }}>
                  Hotline: <Text strong style={{ color: '#1890ff' }}>1900 xxxx</Text>
                  <br />
                  Email: <Text strong>support@evbattery.vn</Text>
                  <br />
                  Thời gian: 24/7
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPage;
