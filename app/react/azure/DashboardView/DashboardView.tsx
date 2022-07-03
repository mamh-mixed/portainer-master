import { useEnvironmentId } from '@/portainer/hooks/useEnvironmentId';

import { DashboardItem } from '@@/DashboardItem';
import { PageHeader } from '@@/PageHeader';

import { useResourceGroups } from '../queries/useResourceGroups';
import { useSubscriptions } from '../queries/useSubscriptions';

export function DashboardView() {
  const environmentId = useEnvironmentId();

  const subscriptionsQuery = useSubscriptions(environmentId);

  const resourceGroupsQuery = useResourceGroups(
    environmentId,
    subscriptionsQuery.data
  );

  const subscriptionsCount = subscriptionsQuery?.data?.length;
  const resourceGroupsCount = Object.values(
    resourceGroupsQuery.resourceGroups
  ).flatMap((x) => Object.values(x)).length;

  return (
    <>
      <PageHeader title="Home" breadcrumbs={[{ label: 'Dashboard' }]} />

      {subscriptionsQuery.data && (
        <div className="row">
          <DashboardItem
            value={subscriptionsCount as number}
            icon="fa fa-th-list"
            type="Subscriptions"
          />

          {!resourceGroupsQuery.isError && !resourceGroupsQuery.isLoading && (
            <DashboardItem
              value={resourceGroupsCount}
              icon="fa fa-th-list"
              type="Resource groups"
            />
          )}
        </div>
      )}
    </>
  );
}
