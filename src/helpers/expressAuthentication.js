// import { SalesChannelMgModel } from './modelsExport';

export default async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(403).json({ error: 'x-api-key header key not found' });
    // const saleChanel = await SalesChannelMgModel.findOne({
    //   where: { apiKey },
    //   attributes: ['apiKey'],
    // });
    // if (saleChanel === null) return res.status(401).json({ message: 'Unauthorized' });
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
