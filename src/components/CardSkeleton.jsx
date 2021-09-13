const CardSkeleton = () => {
  return (
    <div>
      <div className="pokeHeader">
        <div className="skeleton-type"></div>
        <div className="skeleton-id pokemon-id"></div>
      </div>
      <div className="skeleton-img"></div>
      <div className="skeleton-name"></div>
    </div>
  );
};

export default CardSkeleton;
