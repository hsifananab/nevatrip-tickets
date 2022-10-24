import RouteItem from './RouteItem';

const RoutesMenu = ({
  routes,
  activeIndex,
  setActiveIndex,
  handleHideResult,
}) => {
  return (
    <div className="flex gap-4 justify-between bg-gray-200 p-4 rounded-3xl">
      {routes.map((item, index) => (
        <RouteItem
          key={item}
          item={item}
          isSelected={activeIndex === index}
          handleClick={() => {
            handleHideResult();
            return setActiveIndex(index);
          }}
        />
      ))}
    </div>
  );
};

export default RoutesMenu;
