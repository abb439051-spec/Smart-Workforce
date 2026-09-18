import { Button } from "antd";
import {
  FileTextOutlined,
} from "@ant-design/icons";

function ReportsHeader({ onGenerateReport }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reports
        </h1>

        <p className="text-gray-500 mt-1">
          Generate workforce reports and download them as Word or Excel files.
        </p>
      </div>

      <div className="flex gap-3">

        <Button
          type="primary"
          size="large"
          icon={<FileTextOutlined />}
          onClick={onGenerateReport}
        >
          Generate AI Report
        </Button>

      </div>

    </div>
  );
}

export default ReportsHeader;