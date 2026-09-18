import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import api from "../../lib/api";
import dayjs from "dayjs";

import ReportsHeader from "../../components/dashboard/reports/ReportsHeader";
import ReportsFilters from "../../components/dashboard/reports/ReportsFilters";
import ReportsCards from "../../components/dashboard/reports/ReportsCards";
import ReportsTable from "../../components/dashboard/reports/ReportsTable";
import ReportDrawer from "../../components/dashboard/reports/ReportDrawer";
import GenerateReportModal from "../../components/dashboard/reports/GenerateReportModal";

function Reports() {
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");
  const [filters, setFilters] = useState({ search: "", department: "all", reportType: "all", dateRange: null });

  const loadReports = async () => {
    setLoadingError("");
    setLoading(true);
    try {
      const [reportsResponse, analyticsResponse, departmentsResponse] = await Promise.all([
        api.get("/report/getAll"),
        api.get("/analytics/dashboard"),
        api.get("/department/getAll"),
      ]);
      setReports(reportsResponse.data.reports || []);
      setAnalytics(analyticsResponse.data.data);
      setDepartments(departmentsResponse.data.departments || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports().catch((error) => {
      const text = error.response?.data?.message || "Unable to load reports";
      setLoadingError(text);
      message.error(text);
    });
  }, []);

  if (loadingError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {loadingError}
      </div>
    );
  }

  if (loading || !analytics) {
    return <div className="flex min-h-[400px] items-center justify-center"><Spin size="large" /></div>;
  }

  const reportDepartments = [...new Set(reports.map((report) => report.department).filter(Boolean))];
  const reportTypes = [...new Set(reports.map((report) => report.type).filter(Boolean))];

  const filteredReports = reports.filter((report) => {
    const search = filters.search.toLowerCase();
    const matchesSearch = !search || report.report?.toLowerCase().includes(search);
    const matchesDepartment = filters.department === "all"
      || report.department?.toLowerCase() === filters.department.toLowerCase();
    const matchesType = filters.reportType === "all" || report.type === filters.reportType;
    const matchesDates = !filters.dateRange?.length
      || (!dayjs(report.createdAt).isBefore(filters.dateRange[0], "day")
        && !dayjs(report.createdAt).isAfter(filters.dateRange[1], "day"));
    return matchesSearch && matchesDepartment && matchesType && matchesDates;
  });

  return (
    <div className="space-y-6">

      <ReportsHeader
        onGenerateReport={() => setOpen(true)}
      />

      <ReportsFilters
        onChange={setFilters}
        departments={reportDepartments}
        reportTypes={reportTypes}
      />

      <ReportsCards analytics={analytics} />

      <ReportsTable
        reports={filteredReports}
        refreshReports={loadReports}
        onViewReport={(report) => {
          setSelectedReport(report);
          setDrawerOpen(true);
        }}
      />

      <GenerateReportModal
        open={open}
        onClose={() => setOpen(false)}
        refreshReports={loadReports}
        departments={departments}
      />

      <ReportDrawer
        open={drawerOpen}
        report={selectedReport}
        onClose={() => setDrawerOpen(false)}
      />

    </div>
  );
}

export default Reports;