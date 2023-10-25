import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingPage = ({}) => {
  return (
    <div className="p-5 md:p-12">
      <Skeleton />
      <Skeleton width={200} />

      <div className="flex flex-col justify-center items-center md:items-start md:justify-start md:flex-row md:p-10 pl-0 m-5 ml-0">
        <Skeleton width={400} height={350} />
        <div className="pl-0 md:pl-5 mt-10 md:mt-0">
          <Skeleton width={300} />
          <Skeleton width={250} />
          <Skeleton width={200} />
          <br/>
          <Skeleton height={100} width={600} />
          <br/>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
// by Rokas with ❤️
