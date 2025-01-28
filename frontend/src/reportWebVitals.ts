import { CLSMetric, FCPMetric, FIDMetric, INPMetric, LCPMetric, onCLS,onFCP,onFID,onINP,onLCP,onTTFB, ReportOpts, TTFBMetric } from 'web-vitals';

interface ReportWebVitals{
  cls:{onReport:(meric:CLSMetric)=>void, opts?:ReportOpts}
  fid:{onReport:(meric:FIDMetric)=>void, opts?:ReportOpts}
  fcp:{onReport:(meric:FCPMetric)=>void, opts?:ReportOpts}
  lcp:{onReport:(meric:LCPMetric)=>void, opts?:ReportOpts}
  ttfb:{onReport:(meric:TTFBMetric)=>void, opts?:ReportOpts}
  inp:{onReport:(meric:INPMetric)=>void, opts?:ReportOpts}
}

const reportWebVitals = ({cls, fid, fcp, lcp, ttfb, inp}:ReportWebVitals) => {

  onCLS(cls.onReport,cls.opts);
  onFID(fid.onReport,fid.opts);
  onFCP(fcp.onReport,fcp.opts);
  onLCP(lcp.onReport,lcp.opts);
  onTTFB(ttfb.onReport,ttfb.opts);
  onINP(inp.onReport,inp.opts);
};

export default reportWebVitals;
