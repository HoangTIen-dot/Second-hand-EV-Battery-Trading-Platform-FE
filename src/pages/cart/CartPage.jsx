import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Button,
  InputNumber,
  Typography,
  Space,
  Divider,
  Avatar,
  Tag,
  Empty,
  Popconfirm,
  Image,
} from 'antd';
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Header, Footer } from '../../components/layout';
import { useCart } from '../../contexts/CartContext';
import styles from './CartPage.module.css';

const { Title, Text } = Typography;

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();

  const handleQuantityChange = (productId, value) => {
    if (value > 0 && value <= 10) {
      updateQuantity(productId, value);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    // Navigate to payment with all cart items
    navigate('/payment', { state: { cartItems, isCartCheckout: true } });
  };

  const subtotal = getCartTotal();
  const shippingFee = 0; // Free shipping
  const discount = 0;
  const total = subtotal + shippingFee - discount;

  return (
    <div className={styles.cartPage}>
      <Header />

      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <Title level={2} className={styles.pageTitle}>
            <ShoppingCartOutlined style={{ marginRight: 12 }} />
            Giỏ hàng của bạn
          </Title>
          <Text type="secondary">
            {cartItems.length > 0 ? `${getCartCount()} sản phẩm` : 'Chưa có sản phẩm nào'}
          </Text>
        </div>

        {cartItems.length === 0 ? (
          <Card className={styles.emptyCart}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" size="large">
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    Giỏ hàng của bạn đang trống
                  </Text>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingOutlined />}
                    onClick={() => navigate('/products')}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                    }}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Space>
              }
            />
          </Card>
        ) : (
          <Row gutter={[24, 24]}>
            {/* Left Column - Cart Items */}
            <Col xs={24} lg={16}>
              <Card 
                className={styles.cartCard}
                title={
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Text strong style={{ fontSize: 16 }}>
                      Sản phẩm ({cartItems.length})
                    </Text>
                    <Popconfirm
                      title="Xóa tất cả sản phẩm?"
                      description="Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?"
                      onConfirm={clearCart}
                      okText="Xóa tất cả"
                      cancelText="Hủy"
                      okButtonProps={{ danger: true }}
                    >
                      <Button type="text" danger icon={<DeleteOutlined />}>
                        Xóa tất cả
                      </Button>
                    </Popconfirm>
                  </Space>
                }
              >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {cartItems.map((item) => (
                    <Card
                      key={item.id}
                      className={styles.cartItem}
                      hoverable
                    >
                      <Row gutter={16} align="middle">
                        {/* Product Image */}
                        <Col xs={24} sm={6}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            className={styles.productImage}
                            preview={false}
                          />
                        </Col>

                        {/* Product Info */}
                        <Col xs={24} sm={10}>
                          <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <Text strong style={{ fontSize: 16 }}>
                              {item.name}
                            </Text>
                            <Space wrap>
                              <Tag color="blue">{item.brand}</Tag>
                              <Tag color="green">{item.capacity} kWh</Tag>
                              <Tag color="orange">{item.condition}</Tag>
                            </Space>
                            <div>
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                Bảo hành: {item.warranty} tháng
                              </Text>
                            </div>
                          </Space>
                        </Col>

                        {/* Quantity & Price */}
                        <Col xs={24} sm={8}>
                          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            {/* Price */}
                            <div>
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                Đơn giá:
                              </Text>
                              <div>
                                <Text strong style={{ fontSize: 18, color: '#f5222d' }}>
                                  {item.price.toLocaleString('vi-VN')}₫
                                </Text>
                              </div>
                            </div>

                            {/* Quantity Control */}
                            <div>
                              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                                Số lượng:
                              </Text>
                              <Space>
                                <Button
                                  size="small"
                                  icon={<MinusOutlined />}
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                />
                                <InputNumber
                                  min={1}
                                  max={10}
                                  value={item.quantity}
                                  onChange={(value) => handleQuantityChange(item.id, value)}
                                  style={{ width: 60 }}
                                  size="small"
                                />
                                <Button
                                  size="small"
                                  icon={<PlusOutlined />}
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= 10}
                                />
                              </Space>
                            </div>

                            {/* Subtotal */}
                            <div>
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                Tổng:
                              </Text>
                              <div>
                                <Text strong style={{ fontSize: 20, color: '#1890ff' }}>
                                  {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                </Text>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <Popconfirm
                              title="Xóa sản phẩm?"
                              description={`Bạn có chắc muốn xóa "${item.name}" khỏi giỏ hàng?`}
                              onConfirm={() => removeFromCart(item.id)}
                              okText="Xóa"
                              cancelText="Hủy"
                              okButtonProps={{ danger: true }}
                            >
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                block
                              >
                                Xóa
                              </Button>
                            </Popconfirm>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Space>
              </Card>
            </Col>

            {/* Right Column - Order Summary */}
            <Col xs={24} lg={8}>
              <Card 
                className={styles.summaryCard}
                title={
                  <Text strong style={{ fontSize: 16 }}>
                    Tóm tắt đơn hàng
                  </Text>
                }
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/* Price Details */}
                  <div>
                    <div className={styles.summaryRow}>
                      <Text>Tạm tính ({getCartCount()} sản phẩm):</Text>
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

                    <Divider style={{ margin: '16px 0' }} />

                    <div className={styles.summaryRow}>
                      <Text strong style={{ fontSize: 16 }}>Tổng cộng:</Text>
                      <Text strong style={{ fontSize: 24, color: '#f5222d' }}>
                        {total.toLocaleString('vi-VN')}₫
                      </Text>
                    </div>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  {/* Benefits */}
                  <div className={styles.benefits}>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: 13 }}>
                      Ưu đãi khi mua hàng:
                    </Text>
                    <Space direction="vertical" size="small">
                      <div className={styles.benefitItem}>
                        <Text>✅ Miễn phí vận chuyển</Text>
                      </div>
                      <div className={styles.benefitItem}>
                        <Text>✅ Bảo hành chính hãng</Text>
                      </div>
                      <div className={styles.benefitItem}>
                        <Text>✅ Hỗ trợ lắp đặt miễn phí</Text>
                      </div>
                      <div className={styles.benefitItem}>
                        <Text>✅ Đổi trả trong 7 ngày</Text>
                      </div>
                    </Space>
                  </div>

                  <Divider style={{ margin: '8px 0' }} />

                  {/* Action Buttons */}
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      size="large"
                      block
                      icon={<CreditCardOutlined />}
                      onClick={handleCheckout}
                      style={{
                        height: 50,
                        fontSize: 16,
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                      }}
                    >
                      Thanh toán
                    </Button>
                    <Button
                      size="large"
                      block
                      icon={<ShoppingOutlined />}
                      onClick={() => navigate('/products')}
                      style={{ height: 50 }}
                    >
                      Tiếp tục mua sắm
                    </Button>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
