import React, { useState } from "react";
import { Page, Modal, Box, Text } from "zmp-ui";
import { booths } from "../static/booths";
// import { mapHN } from "@/static/mapHN.jpg";

const MAP_IMAGE = "@/static/mapHN.jpg"; // Đường dẫn đến ảnh sơ đồ sự kiện

const InteractMap = () => {
  const [activeBooth, setActiveBooth] = useState(null);

  return (
    <Page>
      <Box p={4}>
        <Text size="large" bold>
          Sơ đồ sự kiện
        </Text>

        <div className="map-container">
          {/* Ảnh nền đã được crop bằng CSS object-position */}
          <img src={MAP_IMAGE} className="map-image" alt="Event Map" />

          {/* Render các điểm tương tác */}
          {booths.map((booth) => (
            <div
              key={booth.id}
              className="booth-hotspot"
              style={{
                top: booth.top,
                left: booth.left,
                width: "15px",
                height: "15px",
              }}
              onClick={() => setActiveBooth(booth)}
            >
              <div className="booth-inner" />
            </div>
          ))}
        </div>
      </Box>

      {/* Modal chi tiết */}
      <Modal
        visible={!!activeBooth}
        title={activeBooth ? `Booth #${activeBooth.id}` : ""}
        onClose={() => setActiveBooth(null)}
        actions={[{ text: "Đã hiểu", close: true }]}
      >
        <Box p={4}>
          <Text size="xLarge" bold color="blue">
            {activeBooth?.name}
          </Text>
          <div style={{ marginTop: "12px" }}>
            <Text>
              Chào mừng bạn đến với gian hàng của {activeBooth?.name}. Vui lòng
              liên hệ tư vấn viên tại quầy để được hỗ trợ trực tiếp.
            </Text>
          </div>
        </Box>
      </Modal>
    </Page>
  );
};

export default InteractMap;
