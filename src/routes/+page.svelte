<script>
  import  Card from '@smui/card';

  let imageUrl = '/assets/clippy.jpg';
  let text = "Clippy wouldn't rip you off.";
</script>

<style>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* full viewport height */
    text-align: center;
  }

  :global(.card-content) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image {
    max-width: 200px;
    margin-bottom: 16px;
  }
</style>

<div class="center-container">
  <Card>
      <img src={imageUrl} alt="Example" class="image" />
      <p>{text}</p>
  </Card>
</div>
