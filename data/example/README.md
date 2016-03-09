#Commands to generate files

##Generate Factorgraph

     pgmlab --generate-factorgraph --pairwise-interaction-file=TF_Gerstein_modified_with_data.pi --logical-factorgraph-file=logical.fg --number-of-states=3

##Learning

     pgmlab --learning --pairwise-interaction-file=TF_Gerstein_modified_with_data.pi --logical-factorgraph-file=logical.fg --learning-observed-data-file=learning.obs --estimated-parameters-file=learnt.fg --number-of-states=3 --logging-on

##Inference

     pgmlab --inference --pairwise-interaction-file=TF_Gerstein_modified_with_data.pi --inference-factorgraph-file=learnt.fg --inference-observed-data-file=inference.obs --posterior-probability-file=TF_Gerstein_modified_with_data.pp --number-of-states=3 
