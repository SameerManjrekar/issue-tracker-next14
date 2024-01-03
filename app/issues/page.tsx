import prisma from "@/prisma/client";
import { Status } from "@prisma/client";

import IssueActions from "./IssueActions";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sameer Issue Tracker - Issue List",
  description: "View All Project Issues",
};

export const dynamic = "force-dynamic";

interface IssuePageProps {
  searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: IssuePageProps) => {
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const validOrderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
    orderBy: validOrderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma?.issue?.count({
    where: { status: validStatus },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuePage;
