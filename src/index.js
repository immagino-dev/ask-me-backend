import 'dotenv/config';

import server from '##/server.js';

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})