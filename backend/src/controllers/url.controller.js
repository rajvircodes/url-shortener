const Url = require("../models/url.model");
const generateShortCode = require("../utils/generateCode");

const shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl, customCode } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        err: "URL is required",
      });
    }

    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json("Invalid URL format");
    }

    let shortCode = customCode ? customCode.trim() : generateShortCode();

    if (customCode) {
      const existing = await Url.findOne({ shortCode });
      if (existing) {
        return res
          .status(409)
          .json({ success: false, message: "Custom code already in use" });
      }
    }

    const duplicate = await Url.findOne({ originalUrl });
    if (duplicate) {
      return res.status(200).json({
        success: true,
        message: "URL already shortened",
        data: {
          shortenUrl: `${process.env.BASE_URL}/${duplicate.shortCode}`,
          shortCode: duplicate.shortCode,
          originalUrl: duplicate.originalUrl,
          clicks: duplicate.clicks,
        },
      });
    }

    // save to DB

    const url = await Url.create({ originalUrl, shortCode });

    res.status(201).json({
      success: true,
      message: "URL created successfully",
      data: {
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl,
        clicks: url.clicks,
      },
    });
  } catch (err) {
    next(err);
  }
};

const redirectUrl = async (req, res, next) => {
  try {
    const { code } = req.params;

    const url = await Url.findOneAndUpdate(
      { shortCode: code },
      { $inc: { clicks: 1 } },
      { new: true },
    );

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short url not found",
      });
    }

    return res.redirect(302, url.originalUrl);
  } catch (error) {
    next(error);
  }
};

const getAllUrls = async (req, res, next) => {
  try {
    const urls = (await Url.find()).toSorted({ createdAt: -1 }).limit(50);

    res.status(200).json({
      success: true,
      count: urls.length,
      data: urls.map((url) => ({
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl,
        clicks: url.clicks,
        createdAt: url.createdAt,
      })),
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {shortenUrl, redirectUrl, getAllUrls}