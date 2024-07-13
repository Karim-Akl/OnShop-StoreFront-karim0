// pages/api/previewData.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const previewData = [
  {
    sectionName: "products",
    content: "products3",
  },
  {
    sectionName: "banner",
    content: "banner2",
  },
  {
    sectionName: "category",
    content: "category1",
  },
];

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(previewData);
};
