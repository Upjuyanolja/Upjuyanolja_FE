import { PointMenu } from './point-detail-menu';
import { PointDetailList } from './point-detail-list';
import { PageComp } from './page';

export const PointDetailComp = () => {
  return (
    <>
      <PointMenu />
      <PointDetailList />
      <PageComp />
    </>
  );
};
