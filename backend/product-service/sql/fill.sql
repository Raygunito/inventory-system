DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM products) THEN
        INSERT INTO products (name, price, stock, description) VALUES 
        ('Mechanical Keyboard', 99.99, 15, 'RGB mechanical keyboard with red switches'),
        ('Gaming Mouse', 49.99, 20, 'Ergonomic gaming mouse with 16000 DPI sensor'),
        ('Wireless Headset', 79.99, 10, 'Noise-cancelling wireless gaming headset'),
        ('27-inch Monitor', 249.99, 8, '27-inch Full HD monitor with 144Hz refresh rate'),
        ('Gaming Chair', 199.99, 5, 'Ergonomic gaming chair with lumbar support'),
        ('SSD 1TB', 129.99, 12, '1TB NVMe SSD with high-speed read/write'),
        ('External HDD 2TB', 89.99, 10, '2TB external hard drive with USB 3.0'),
        ('Gaming Laptop', 1299.99, 3, 'High-performance gaming laptop with RTX 4060'),
        ('Wireless Earbuds', 69.99, 25, 'Bluetooth earbuds with noise cancellation'),
        ('Mechanical Numpad', 39.99, 30, 'Compact mechanical numpad with customizable keys'),
        ('Portable Charger', 29.99, 18, '10,000mAh power bank with fast charging'),
        ('Smartwatch', 149.99, 7, 'Smartwatch with heart rate and sleep tracking'),
        ('4K Webcam', 79.99, 10, '4K webcam with autofocus and noise reduction mic'),
        ('USB-C Docking Station', 89.99, 6, 'Docking station with multiple USB and HDMI ports'),
        ('Wireless Charging Pad', 24.99, 15, 'Fast wireless charging pad for smartphones'),
        ('Mechanical Switch Tester', 19.99, 50, 'Switch tester with 12 different mechanical key switches'),
        ('RGB LED Strip', 14.99, 40, 'USB-powered RGB LED strip for desk setup'),
        ('Smart Speaker', 99.99, 12, 'AI-powered smart speaker with voice control'),
        ('Gaming Desk', 249.99, 4, 'Spacious gaming desk with cable management'),
        ('Ergonomic Mousepad', 19.99, 25, 'Large ergonomic mousepad with wrist rest'),
        ('Portable Monitor', 199.99, 5, '15.6-inch portable monitor with USB-C'),
        ('External GPU Enclosure', 299.99, 2, 'eGPU enclosure for high-end graphics performance'),
        ('WiFi 6 Router', 129.99, 6, 'High-speed WiFi 6 router with MU-MIMO'),
        ('Bluetooth Mechanical Keyboard', 119.99, 8, 'Wireless mechanical keyboard with hot-swappable switches'),
        ('Smart Light Bulb', 19.99, 30, 'WiFi-enabled smart light bulb with RGB control'),
        ('VR Headset', 349.99, 3, 'Virtual reality headset with motion tracking'),
        ('Noise Cancelling Headphones', 179.99, 7, 'Over-ear noise cancelling wireless headphones'),
        ('Microphone for Streaming', 99.99, 10, 'Professional USB microphone for streaming and podcasts'),
        ('USB-C Hub', 34.99, 15, 'Multi-port USB-C hub with SD card reader'),
        ('Custom Keycaps Set', 59.99, 20, 'PBT keycap set with customizable designs');
    END IF;
END $$;