App.Router.map ->
  @resource 'dashboard' # Status board
  @resource 'issue'
  @resource 'family', { path: 'family/:family_id' }, ->
    @route 'status'
    @resource 'variants',
      queryParams: ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132', 'esp6500', 'AD', 'AD_denovo', 'AR', 'AR_compound', 'AR_denovo', 'Na', 'X', 'X_denovo', 'priority', '-', 'frameshift deletion', 'frameshift insertion', 'nonframeshift deletion', 'nonframeshift insertion', 'nonsynonymous SNV', 'stopgain SNV', 'stoploss SNV', 'synonymous SNV', 'unknown', 'downstream', 'exonic', 'intergenic', 'intronic', 'ncRNA_exonic', 'ncRNA_intronic', 'ncRNA_splicing', 'ncRNA_UTR3', 'ncRNA_UTR5', 'splicing', 'upstream', 'UTR3', 'UTR5', 'gene_name']
    , ->
      @resource 'variant', { path: '/:variant_id' }
