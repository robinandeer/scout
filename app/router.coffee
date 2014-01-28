App.Router.map ->
  @resource 'dashboard' # Status board
  @resource 'issue'
  @resource 'family', { path: 'family/:family_id' }, ->
    @route 'status'
    @resource 'variants',
      queryParams: ['relation', '1000 Genomes', 'dbsnp129', 'dbsnp132', 'esp6500', 'inheritence_models_AD', 'inheritence_models_AD_denovo', 'inheritence_models_AR', 'inheritence_models_AR_compound', 'inheritence_models_AR_denovo', 'inheritence_models_Na', 'inheritence_models_X', 'inheritence_models_X_denovo', 'priority', 'functional_annotations_-', 'functional_annotations_frameshift deletion', 'functional_annotations_frameshift insertion', 'functional_annotations_nonframeshift deletion', 'functional_annotations_nonframeshift insertion', 'functional_annotations_nonsynonymous SNV', 'functional_annotations_stopgain SNV', 'functional_annotations_stoploss SNV', 'functional_annotations_synonymous SNV', 'functional_annotations_unknown', 'gene_annotations_downstream', 'gene_annotations_exonic', 'gene_annotations_intergenic', 'gene_annotations_intronic', 'gene_annotations_ncRNA_exonic', 'gene_annotations_ncRNA_intronic', 'gene_annotations_ncRNA_splicing', 'gene_annotations_ncRNA_UTR3', 'gene_annotations_ncRNA_UTR5', 'gene_annotations_splicing', 'gene_annotations_upstream', 'gene_annotations_UTR3', 'gene_annotations_UTR5', 'gene_name']
    , ->
      @resource 'variant', { path: '/:variant_id' }
