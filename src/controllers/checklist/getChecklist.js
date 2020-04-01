import getCheckList from '../../methods/chl/v1/getCheckList';

export default ({ rollbar }) => async (req, res) => {
  try {
    const response = await getCheckList({ data: req.query, rollbar });
    return res.json(response);
  } catch (err) {
    rollbar.error(`controllers/checkList/getCheckList::RESPONSE:ERROR: ${err.message}`);
    return res.status(400).json({ error: err.message });
  }
};
