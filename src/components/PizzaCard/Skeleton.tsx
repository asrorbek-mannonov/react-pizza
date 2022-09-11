import React from 'react';
import ContentLoader from 'react-content-loader';

function Skeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} {...props}>
      <ContentLoader
        speed={2}
        width={280}
        height={457}
        viewBox="0 0 280 457"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="138" cy="138" r="138" />
        <rect x="150" y="305" rx="0" ry="0" width="13" height="0" />
        <rect x="0" y="287" rx="10" ry="10" width="276" height="24" />
        <rect x="2" y="320" rx="10" ry="10" width="270" height="84" />
        <rect x="2" y="422" rx="10" ry="10" width="90" height="27" />
        <rect x="124" y="411" rx="10" ry="10" width="150" height="44" />
      </ContentLoader>
    </div>
  );
}

export default Skeleton;
