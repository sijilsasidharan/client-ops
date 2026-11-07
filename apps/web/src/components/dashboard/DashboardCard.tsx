const DashboardCard = ({ title, value }: { title: string; value: unknown }) => {
  return (
    <div className="p-4 border rounded shadow-sm ">
      <h3>{title}</h3>
      <p>{String(value)}</p>
    </div>
  );
};

export default DashboardCard;
