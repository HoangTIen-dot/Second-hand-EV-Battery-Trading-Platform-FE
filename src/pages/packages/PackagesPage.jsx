import React, { useState } from 'react';
import { Card, Row, Col, Button, Tag, Space, Divider, Badge, Typography, Tooltip } from 'antd';
import {
  CrownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  StarOutlined,
  RocketOutlined,
  SafetyOutlined,
  TrophyOutlined,
  FireOutlined,
  ShareAltOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../../components/layout';
import styles from './PackagesPage.module.css';

const { Title, Text, Paragraph } = Typography;

const PackagesPage = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: 'Đồng',
      icon: '🥉',
      level: 1,
      color: '#fa709a',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      popular: false,
      pricePerPost: 0,
      features: {
        duration: 3,
        featured: false,
        priority: 'Thấp',
        topPosition: false,
        highlight: false,
        socialShare: false,
        badge: true,
        analytics: 'Cơ bản',
        support: 'Email',
        autoRenew: false,
        seoOptimization: false,
        premiumSupport: false
      },
      description: 'Gói cơ bản cho người mới bắt đầu'
    },
    {
      id: 2,
      name: 'Bạc',
      icon: '🥈',
      level: 2,
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      popular: false,
      pricePerPost: 100000,
      features: {
        duration: 7,
        featured: false,
        priority: 'Trung bình',
        topPosition: true,
        highlight: true,
        socialShare: true,
        badge: true,
        analytics: 'Nâng cao',
        support: 'Email + Chat',
        autoRenew: false,
        seoOptimization: false,
        premiumSupport: false
      },
      description: 'Phù hợp cho người bán thường xuyên'
    },
    {
      id: 3,
      name: 'Vàng',
      icon: '🥇',
      level: 3,
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      popular: false,
      pricePerPost: 200000,
      features: {
        duration: 14,
        featured: true,
        priority: 'Cao',
        topPosition: true,
        highlight: true,
        socialShare: true,
        badge: true,
        analytics: 'Chuyên nghiệp',
        support: 'Ưu tiên 24/7',
        autoRenew: true,
        seoOptimization: true,
        premiumSupport: true
      },
      description: 'Tối ưu cho doanh nghiệp nhỏ'
    },
    {
      id: 4,
      name: 'Kim Cương',
      icon: '💎',
      level: 4,
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      popular: false,
      pricePerPost: 350000,
      features: {
        duration: 30,
        featured: true,
        priority: 'Tối đa',
        topPosition: true,
        highlight: true,
        socialShare: true,
        badge: true,
        analytics: 'Toàn diện',
        support: 'VIP 24/7',
        autoRenew: true,
        seoOptimization: true,
        premiumSupport: true
      },
      description: 'Giải pháp toàn diện cho doanh nghiệp'
    }
  ];

  const featuresList = [
    { key: 'duration', label: 'Thời hạn hiển thị (ngày)', icon: <ClockCircleOutlined /> },
    { key: 'featured', label: 'Tin nổi bật trang chủ', icon: <StarOutlined /> },
    { key: 'priority', label: 'Độ ưu tiên hiển thị', icon: <RocketOutlined /> },
    { key: 'topPosition', label: 'Hiển thị vị trí top', icon: <TrophyOutlined /> },
    { key: 'highlight', label: 'Làm nổi bật', icon: <FireOutlined /> },
    { key: 'socialShare', label: 'Chia sẻ mạng xã hội', icon: <ShareAltOutlined /> },
    { key: 'badge', label: 'Huy hiệu đẳng cấp', icon: <CrownOutlined /> },
    { key: 'analytics', label: 'Phân tích chi tiết', icon: <EyeOutlined /> },
    { key: 'support', label: 'Hỗ trợ khách hàng', icon: <SafetyOutlined /> },
    { key: 'seoOptimization', label: 'Tối ưu SEO', icon: <ThunderboltOutlined /> }
  ];

  const handleSelectPackage = (pkg) => {
    navigate('/customer', { state: { selectedPackage: pkg } });
  };

  return (
    <div className={styles.packagesPage}>
      <Header />
      
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <Title level={1} className={styles.heroTitle}>
              <CrownOutlined style={{ marginRight: 16, color: '#faad14' }} />
              Chọn Gói Đăng Tin Phù Hợp
            </Title>
            <Paragraph className={styles.heroSubtitle}>
              Thanh toán theo từng bài đăng - Linh hoạt và tiết kiệm.
              Chọn gói phù hợp để tăng hiệu quả bán hàng!
            </Paragraph>
          </div>
        </div>

        {/* Packages Grid */}
        <Row gutter={[24, 24]} className={styles.packagesGrid}>
          {packages.map((pkg) => (
            <Col xs={24} sm={12} lg={6} key={pkg.id}>
              <Badge.Ribbon 
                text={pkg.popular ? "PHỔ BIẾN NHẤT" : null}
                color={pkg.popular ? "red" : null}
              >
                <Card
                  className={`${styles.packageCard} ${pkg.popular ? styles.popularCard : ''}`}
                  hoverable
                  style={{
                    borderTop: `4px solid ${pkg.color}`,
                    transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {/* Package Header */}
                  <div className={styles.packageHeader}>
                    <div 
                      className={styles.packageIcon}
                      style={{ background: pkg.gradient }}
                    >
                      <span style={{ fontSize: 48 }}>{pkg.icon}</span>
                    </div>
                    <Title level={3} className={styles.packageName}>
                      {pkg.name}
                    </Title>
                    <Text type="secondary" className={styles.packageDescription}>
                      {pkg.description}
                    </Text>
                  </div>

                  {/* Price */}
                  <div className={styles.packagePrice}>
                    <div className={styles.priceAmount}>
                      <span className={styles.currency}>₫</span>
                      <span className={styles.amount}>
                        {pkg.pricePerPost.toLocaleString('vi-VN')}
                      </span>
                      <span className={styles.period}>/bài đăng</span>
                    </div>
                    <Text type="secondary" style={{ fontSize: 14, marginTop: 8, display: 'block' }}>
                      Hiển thị {pkg.features.duration} ngày
                    </Text>
                  </div>

                  <Divider />

                  {/* Features */}
                  <div className={styles.featuresList}>
                    {featuresList.map((feature) => {
                      const value = pkg.features[feature.key];
                      const isAvailable = value && value !== false;
                      
                      return (
                        <div 
                          key={feature.key}
                          className={`${styles.featureItem} ${!isAvailable ? styles.unavailable : ''}`}
                        >
                          <Space>
                            <span className={styles.featureIcon} style={{ color: pkg.color }}>
                              {isAvailable ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                            </span>
                            <Text className={styles.featureLabel}>
                              {feature.label}
                            </Text>
                          </Space>
                          {isAvailable && typeof value !== 'boolean' && (
                            <Tag color={pkg.color} className={styles.featureValue}>
                              {value}
                            </Tag>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Button */}
                  <Button
                    type="primary"
                    size="large"
                    block
                    className={styles.selectButton}
                    style={{
                      background: pkg.gradient,
                      border: 'none',
                      marginTop: 24,
                      height: 48,
                      fontSize: 16,
                      fontWeight: 600
                    }}
                    onClick={() => handleSelectPackage(pkg)}
                  >
                    Chọn gói {pkg.name}
                  </Button>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>

        {/* Comparison Table */}
        <div className={styles.comparisonSection}>
          <Title level={2} className={styles.sectionTitle}>
            So sánh chi tiết các gói
          </Title>
          <Card className={styles.comparisonCard}>
            <div className={styles.comparisonTable}>
              <div className={styles.tableHeader}>
                <div className={styles.featureColumn}>Tính năng</div>
                {packages.map(pkg => (
                  <div key={pkg.id} className={styles.packageColumn}>
                    <span style={{ fontSize: 32 }}>{pkg.icon}</span>
                    <div style={{ fontWeight: 600, marginTop: 8 }}>{pkg.name}</div>
                  </div>
                ))}
              </div>
              {featuresList.map(feature => (
                <div key={feature.key} className={styles.tableRow}>
                  <div className={styles.featureColumn}>
                    <Space>
                      {feature.icon}
                      <Text strong>{feature.label}</Text>
                    </Space>
                  </div>
                  {packages.map(pkg => {
                    const value = pkg.features[feature.key];
                    const isAvailable = value && value !== false;
                    return (
                      <div key={pkg.id} className={styles.packageColumn}>
                        {isAvailable ? (
                          typeof value === 'boolean' ? (
                            <CheckCircleOutlined style={{ color: pkg.color, fontSize: 20 }} />
                          ) : (
                            <Tag color={pkg.color}>{value}</Tag>
                          )
                        ) : (
                          <CloseCircleOutlined style={{ color: '#d9d9d9', fontSize: 20 }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <Title level={2} className={styles.sectionTitle}>
            Câu hỏi thường gặp
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card className={styles.faqCard}>
                <Title level={4}>🤔 Tôi có thể thay đổi gói sau khi đăng ký?</Title>
                <Paragraph>
                  Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. 
                  Phí chênh lệch sẽ được tính theo tỷ lệ thời gian sử dụng.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card className={styles.faqCard}>
                <Title level={4}>💳 Phương thức thanh toán nào được chấp nhận?</Title>
                <Paragraph>
                  Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, thẻ ATM, 
                  ví điện tử (MoMo, ZaloPay) và chuyển khoản ngân hàng.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card className={styles.faqCard}>
                <Title level={4}>🔄 Chính sách hoàn tiền như thế nào?</Title>
                <Paragraph>
                  Hoàn tiền 100% trong vòng 7 ngày nếu bạn không hài lòng 
                  với dịch vụ, không cần lý do.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card className={styles.faqCard}>
                <Title level={4}>📞 Tôi có được hỗ trợ kỹ thuật không?</Title>
                <Paragraph>
                  Tất cả các gói đều có hỗ trợ kỹ thuật. Gói Vàng và Kim Cương 
                  được ưu tiên và hỗ trợ 24/7.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackagesPage;
