# A simple QR code reader

Install with `git clone --recursive`. It is pulling the whole `gaia` repository, be patient.

Some QR Code images are in `tests`. It currently supports URLs, mails and phone numbers. On a Mac, with B2G Destkop, you can put the images in your `~/Pictures` folder to find them in the galery app.

## Known issues
- When running in the browser, you'll have to quit the galery app yourself for two types of QR codes
- The Browser will open QR code links twice and not switch to the right tab

## Ideas for the future
- Use getUserMedia
- Add "export" sharing options for unrecognized data format
- Add "import" options from galery
